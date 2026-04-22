import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import {
  applyAuthEnvironment,
  getObservedSessionCookieNames,
  isSecureAuthRequest,
} from "@/utils/auth/env";

const { authSecret } = applyAuthEnvironment();

const roleProtectedRoutes = {
  admin: ["/admin"],
  editor: ["/editor"],
} as const;

function isMatchedPath(pathname: string, paths: readonly string[]) {
  return paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

function getRequiredRole(pathname: string) {
  const entries = Object.entries(roleProtectedRoutes) as Array<
    [keyof typeof roleProtectedRoutes, readonly string[]]
  >;

  for (const [role, paths] of entries) {
    if (isMatchedPath(pathname, paths)) {
      return role;
    }
  }

  return null;
}

function attachDebugHeaders(
  response: NextResponse,
  values: Record<string, string>
) {
  Object.entries(values).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    const requiredRole = getRequiredRole(pathname);
    const secureCookie = isSecureAuthRequest(req);
    const observedCookies = getObservedSessionCookieNames(req);

    if (isMatchedPath(pathname, requireAuth) || requiredRole) {
      const token = await getToken({
        req,
        secret: authSecret,
        secureCookie,
      });

      if (!token) {
        const url = new URL("/auth/login", req.url);
        const callbackUrl = `${req.nextUrl.pathname}${req.nextUrl.search}`;
        url.searchParams.set("callbackUrl", callbackUrl);
        url.searchParams.set("authDebug", "missing-token");
        url.searchParams.set("authCookieMode", secureCookie ? "secure" : "standard");
        url.searchParams.set("authCookies", observedCookies.join(",") || "none");

        console.warn("[withAuth] Missing token for protected route", {
          pathname,
          callbackUrl,
          requiredRole,
          secureCookie,
          observedCookies,
          hasAuthSecret: Boolean(authSecret),
          nextAuthUrl: process.env.NEXTAUTH_URL || "",
          host: req.headers.get("host") || "",
          forwardedProto: req.headers.get("x-forwarded-proto") || "",
        });

        return attachDebugHeaders(NextResponse.redirect(url), {
          "x-auth-debug-reason": "missing-token",
          "x-auth-cookie-mode": secureCookie ? "secure" : "standard",
          "x-auth-cookies": observedCookies.join(",") || "none",
          "x-auth-path": callbackUrl,
        });
      }

      if (requiredRole && token.role !== requiredRole) {
        console.warn("[withAuth] Role mismatch", {
          pathname,
          requiredRole,
          tokenRole: token.role || "",
          email: token.email || "",
        });

        return attachDebugHeaders(NextResponse.redirect(new URL("/", req.url)), {
          "x-auth-debug-reason": "role-mismatch",
          "x-auth-required-role": requiredRole,
          "x-auth-token-role": String(token.role || ""),
          "x-auth-path": pathname,
        });
      }
    }

    return middleware(req, next);
  };
}
