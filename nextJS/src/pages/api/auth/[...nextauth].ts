import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { applyAuthEnvironment } from "@/utils/auth/env";
import {
  findUserByEmail,
  signInWithOAuth,
  verifyUserCredentials,
} from "../../../utils/db/servicefirebase";

const { authSecret } = applyAuthEnvironment();

const oauthProviders = ["google", "github"] as const;
const blockedRedirectPrefixes = ["/api/auth"];
const blockedRedirectPaths = new Set(["/auth/login", "/login"]);

function getSafeRedirectUrl(url: string, baseUrl: string) {
  const isBlockedPath = (pathname: string) =>
    blockedRedirectPaths.has(pathname) ||
    blockedRedirectPrefixes.some((prefix) => pathname.startsWith(prefix));

  try {
    if (url.startsWith("/")) {
      if (url.startsWith("//") || isBlockedPath(url)) {
        return baseUrl;
      }

      return `${baseUrl}${url}`;
    }

    const parsedUrl = new URL(url);

    if (parsedUrl.origin !== baseUrl || isBlockedPath(parsedUrl.pathname)) {
      return baseUrl;
    }

    return parsedUrl.toString();
  } catch {
    return baseUrl;
  }
}

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },

    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }

      const user = await verifyUserCredentials(
        credentials.email,
        credentials.password
      );

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        role: user.role,
        image: user.image || null,
        type: "credentials",
      };
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  );
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async signIn({ account, profile, user }: any) {
      console.info("[NextAuth] signIn callback", {
        provider: account?.provider || "",
        type: account?.type || "",
        userEmail: user?.email || profile?.email || "",
        hasUser: Boolean(user),
      });

      if (!account?.provider || !oauthProviders.includes(account.provider)) {
        return true;
      }

      const result = await signInWithOAuth({
        fullname: profile?.name || user?.name || "",
        email: profile?.email || user?.email || "",
        image: user?.image || profile?.picture || null,
        type: account.provider,
      });

      console.info("[NextAuth] OAuth persistence result", {
        provider: account.provider,
        status: result.status,
        message: result.message,
        email: profile?.email || user?.email || "",
      });

      return result.status;
    },

    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials" && user) {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
        token.image = user.image ?? token.image;
        token.type = "credentials";
      }

      if (account?.provider && oauthProviders.includes(account.provider)) {
        const email = profile?.email || user?.email || token.email || "";
        const databaseUser = await findUserByEmail(email);
        const data = {
          fullname:
            databaseUser?.fullname ||
            profile?.name ||
            user?.name ||
            token.fullname,
          email: databaseUser?.email || email,
          image:
            databaseUser?.image ||
            user?.image ||
            profile?.picture ||
            token.image,
          type: account.provider,
          role: databaseUser?.role || "member",
        };

        token.fullname = data.fullname;
        token.email = data.email;
        token.image = data.image;
        token.type = data.type;
        token.role = data.role;
      }

      if (account?.provider) {
        console.info("[NextAuth] jwt callback", {
          provider: account.provider,
          email: token.email || "",
          role: token.role || "",
          type: token.type || "",
        });
      }

      return token;
    },

    async session({ session, token }: any) {
      if (token.email) {
        session.user.email = token.email;
      }

      if (token.fullname) {
        session.user.fullname = token.fullname;
      }

      if (token.image !== undefined) {
        session.user.image = token.image;
      }

      if (token.role) {
        session.user.role = token.role;
      }

      if (token.type) {
        session.user.type = token.type;
      }

      console.info("[NextAuth] session callback", {
        email: session.user.email || "",
        role: session.user.role || "",
        type: session.user.type || "",
      });

      return session;
    },

    async redirect({ url, baseUrl }) {
      const safeUrl = getSafeRedirectUrl(url, baseUrl);

      console.info("[NextAuth] redirect callback", {
        requestedUrl: url,
        baseUrl,
        safeUrl,
      });

      return safeUrl;
    },
  },

  secret: authSecret,

  providers,
};

export default NextAuth(authOptions);
