import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

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

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    const requiredRole = getRequiredRole(pathname);

    if (isMatchedPath(pathname, requireAuth) || requiredRole) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        const url = new URL("/auth/login", req.url);
        const callbackUrl = `${req.nextUrl.pathname}${req.nextUrl.search}`;
        url.searchParams.set("callbackUrl", callbackUrl);
        return NextResponse.redirect(url);
      }

      if (requiredRole && token.role !== requiredRole) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return middleware(req, next);
  };
}
