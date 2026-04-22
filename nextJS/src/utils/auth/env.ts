import type { NextRequest } from "next/server";

const isLocalhostUrl = (value: string) =>
  /^https?:\/\/localhost(?::\d+)?\/?$/i.test(value);

export function resolveNextAuthUrl() {
  const configuredUrl = process.env.NEXTAUTH_URL?.trim();
  const vercelHost =
    process.env.VERCEL_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

  if (configuredUrl) {
    const shouldReplaceLocalhost =
      process.env.NODE_ENV === "production" && isLocalhostUrl(configuredUrl);

    if (!shouldReplaceLocalhost) {
      return configuredUrl;
    }
  }

  if (!vercelHost) {
    return configuredUrl;
  }

  const vercelUrl = vercelHost.startsWith("http")
    ? vercelHost
    : `https://${vercelHost}`;

  if (process.env.NODE_ENV === "production") {
    return vercelUrl;
  }

  return configuredUrl;
}

export function resolveAuthSecret() {
  return process.env.NEXTAUTH_SECRET?.trim() || process.env.AUTH_SECRET?.trim();
}

export function applyAuthEnvironment() {
  const normalizedNextAuthUrl = resolveNextAuthUrl();
  const authSecret = resolveAuthSecret();

  if (normalizedNextAuthUrl) {
    process.env.NEXTAUTH_URL = normalizedNextAuthUrl;
  }

  if (authSecret) {
    process.env.NEXTAUTH_SECRET = authSecret;
  }

  return {
    normalizedNextAuthUrl,
    authSecret,
  };
}

export function isSecureAuthRequest(req: NextRequest) {
  const forwardedProto = req.headers.get("x-forwarded-proto");

  if (forwardedProto) {
    return forwardedProto.includes("https");
  }

  return req.nextUrl.protocol === "https:";
}

export function getObservedSessionCookieNames(req: NextRequest) {
  const authCookieNames = [
    "next-auth.session-token",
    "__Secure-next-auth.session-token",
    "__Host-next-auth.csrf-token",
    "next-auth.csrf-token",
    "__Secure-next-auth.callback-url",
    "next-auth.callback-url",
  ];

  return authCookieNames.filter((cookieName) => req.cookies.has(cookieName));
}
