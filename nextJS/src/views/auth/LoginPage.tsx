import Link from "next/link";
import style from "../../pages/auth/login/login.module.scss";
import { SyntheticEvent, useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";

function TampilanLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [availableProviders, setAvailableProviders] = useState<string[]>([]);
  const { push, query } = useRouter();
  const rawCallbackUrl = Array.isArray(query.callbackUrl)
    ? query.callbackUrl[0]
    : query.callbackUrl || "/";
  const callbackUrl =
    typeof rawCallbackUrl === "string" && rawCallbackUrl.startsWith("/")
      ? rawCallbackUrl
      : "/";

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

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setError("");
    setIsLoading(true);
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

      if (res?.error) {
        setIsLoading(false);
        setError(res.error || "Login failed");
        return;
      }

      setIsLoading(false);
      await push(callbackUrl);
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
