import Link from "next/link";
import style from "../../auth/register/register.module.scss";
import { useState } from "react";

const TampilanRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setIsLoading(true);
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const fullname = formData.get("fullname") as string;
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

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, fullname, password }),
    });

    const result = await response.json();

    if (response.status === 200) {
      form.reset();
      setIsLoading(false);
      window.location.href = "/auth/login";
    } else {
      setIsLoading(false);
      setError(result.name || "An error occurred");
    }
  };
  return (
    <div className={style.register}>
      <h1 className={style.register__title}>Halaman Register</h1>
      {error && <p className={style.register__error}>{error}</p>}
      <form className={style.register__form} onSubmit={handleSubmit}>
        <div className={style.register__form__item}>
          <label htmlFor="email" className={style.register__form__item__label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            className={style.register__form__item__input}
          />
        </div>

        <div className={style.register__form__item}>
          <label htmlFor="fullname" className={style.register__form__item__label}>
            Fullname
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Fullname"
            className={style.register__form__item__input}
          />
        </div>

        <div className={style.register__form__item}>
          <label htmlFor="password" className={style.register__form__item__label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            minLength={6}
            className={style.register__form__item__input}
          />
        </div>

        <div className={style.register__form__item}>
          <button type="submit" className={style.button} disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </div>

        <p className={style.register__login_text}>
          Sudah punya akun?{" "}
          <Link href="/auth/login" className={style.register__login_link}>
            Ke Halaman Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default TampilanRegister;
