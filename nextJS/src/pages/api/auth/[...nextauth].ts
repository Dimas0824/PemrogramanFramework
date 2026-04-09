import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import {
  findUserByEmail,
  signInWithOAuth,
  verifyUserCredentials,
} from "../../../utils/db/servicefirebase";

const oauthProviders = ["google", "github"] as const;

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
      if (!account?.provider || !oauthProviders.includes(account.provider)) {
        return true;
      }

      const result = await signInWithOAuth({
        fullname: profile?.name || user?.name || "",
        email: profile?.email || user?.email || "",
        image: user?.image || profile?.picture || null,
        type: account.provider,
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

      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      if (new URL(url).origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  providers,
};

export default NextAuth(authOptions);
