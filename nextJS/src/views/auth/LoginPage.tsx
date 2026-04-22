import Link from "next/link";
import style from "../../pages/auth/login/login.module.scss";
import { SyntheticEvent, useEffect, useState } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const blockedCallbackPrefixes = ["/api/auth"];
const blockedCallbackPaths = new Set(["/auth/login", "/login"]);

function getSafeCallbackUrl(value: unknown) {
  if (typeof value !== "string") {
    return "/";
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return "/";
  }

  let safePath = normalizedValue;

  if (!normalizedValue.startsWith("/")) {
    try {
      const parsedUrl = new URL(normalizedValue);
      const currentOrigin =
        typeof window !== "undefined" ? window.location.origin : parsedUrl.origin;

      if (parsedUrl.origin !== currentOrigin) {
        return "/";
      }

      safePath = `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
    } catch {
      return "/";
    }
  }

  if (!safePath.startsWith("/") || safePath.startsWith("//")) {
    return "/";
  }

  if (blockedCallbackPaths.has(safePath)) {
    return "/";
  }

  if (blockedCallbackPrefixes.some((prefix) => safePath.startsWith(prefix))) {
    return "/";
  }

  return safePath;
}

function TampilanLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [availableProviders, setAvailableProviders] = useState<string[]>([]);
  const { data: session, status } = useSession();
  const { asPath, push, query } = useRouter();
  const rawCallbackUrl = Array.isArray(query.callbackUrl)
    ? query.callbackUrl[0]
    : query.callbackUrl || "/";
  const callbackUrl = getSafeCallbackUrl(rawCallbackUrl);

  useEffect(() => {
    const loadProviders = async () => {
      const providers = await getProviders();
      const providerIds = Object.keys(providers ?? {}).filter(
        (provider) => provider !== "credentials"
      );
      setAvailableProviders(providerIds);
    };

    loadProviders();
  }, []);

  useEffect(() => {
    if (!query.authDebug) {
      return;
    }

    const debugInfo = {
      reason: Array.isArray(query.authDebug) ? query.authDebug[0] : query.authDebug,
      callbackUrl,
      cookieMode: Array.isArray(query.authCookieMode)
        ? query.authCookieMode[0]
        : query.authCookieMode,
      cookies: Array.isArray(query.authCookies)
        ? query.authCookies[0]
        : query.authCookies,
    };

    console.warn("[LoginPage] Auth redirect debug", debugInfo);
  }, [callbackUrl, query.authCookieMode, query.authCookies, query.authDebug]);

  useEffect(() => {
    console.info("[LoginPage] Session snapshot", {
      path: asPath,
      status,
      user: session?.user
        ? {
            email: session.user.email,
            fullname: session.user.fullname,
            role: session.user.role,
            type: session.user.type,
          }
        : null,
      authCookies: document.cookie
        .split(";")
        .map((cookie) => cookie.trim())
        .filter((cookie) => cookie.startsWith("next-auth") || cookie.startsWith("__Secure-next-auth")),
    });
  }, [asPath, session, status]);

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setError("");
    setIsLoading(true);
    console.info("[LoginPage] OAuth signIn start", {
      provider,
      callbackUrl,
      path: asPath,
      authDebug: query.authDebug,
      authCookieMode: query.authCookieMode,
      authCookies: query.authCookies,
    });
    await signIn(provider, { callbackUrl });
    setIsLoading(false);
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    setError("");
    setIsLoading(true);
    event.preventDefault();
    const target = event.target as HTMLFormElement & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email) {
      setIsLoading(false);
      setError("Email wajib diisi");
      return;
    }

    if (password.length < 6) {
      setIsLoading(false);
      setError("Password minimal 6 karakter");
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: target.email.value,
        password: target.password.value,
        callbackUrl,
      });

      console.info("[LoginPage] Credentials signIn result", {
        ok: res?.ok,
        error: res?.error,
        status: res?.status,
        url: res?.url,
        callbackUrl,
      });

      if (res?.error) {
        setIsLoading(false);
        setError(res.error || "Login failed");
        return;
      }

      if (!res?.ok) {
        setIsLoading(false);
        setError("Login failed");
        return;
      }

      setIsLoading(false);
      const nextUrl = getSafeCallbackUrl(res.url || callbackUrl);
      console.info("[LoginPage] Redirect after credentials login", {
        nextUrl,
      });
      await push(nextUrl);
    } catch {
      setIsLoading(false);
      setError("Wrong email or password");
    }
  };
  return (
    <div className={style.login}>
      <h1 className={style.login__title}>Halaman Login</h1>
      {error && <p className={style.login__error}>{error}</p>}
      <form className={style.login__form} onSubmit={handleSubmit}>
        <div className={style.login__form__item}>
          <label htmlFor="email" className={style.login__form__item__label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            className={style.login__form__item__input}
          />
        </div>

        <div className={style.login__form__item}>
          <label htmlFor="password" className={style.login__form__item__label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            minLength={6}
            className={style.login__form__item__input}
          />
        </div>

        <div className={style.login__form__item}>
          <button type="submit" className={style.button} disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
          <br /><br />
          {availableProviders.includes("google") && (
            <>
              <button
                type="button"
                onClick={() => handleOAuthLogin("google")}
                className={style.button}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login with Google"}
              </button>
              <br /><br />
            </>
          )}
          {availableProviders.includes("github") && (
            <button
              type="button"
              onClick={() => handleOAuthLogin("github")}
              className={style.button}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login with GitHub"}
            </button>
          )}
        </div>

        <p className={style.login__login_text}>
          Belum punya akun?{" "}
          <Link href="/auth/register" className={style.login__login_link}>
            Ke Halaman Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default TampilanLogin;
