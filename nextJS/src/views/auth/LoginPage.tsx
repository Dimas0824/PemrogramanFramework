import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import styles from "@/pages/auth/login/login.module.scss";

const LoginPage = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const redirectTo = typeof router.query.from === "string" ? router.query.from : "/profile";

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (!form.fullname || !form.email || !form.password) {
            setError("Full name, email, dan password wajib diisi.");
            return;
        }

        setIsLoading(true);

        const result = await signIn("credentials", {
            redirect: false,
            fullname: form.fullname,
            email: form.email,
            password: form.password,
            callbackUrl: redirectTo,
        });

        setIsLoading(false);

        if (result?.error) {
            setError("Login gagal. Silakan cek kembali data Anda.");
            return;
        }

        await router.push(result?.url || redirectTo);
    };

    if (status === "authenticated" && session?.user) {
        return (
            <div className={styles.login}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Anda sudah login</h1>
                    <p className={styles.description}>
                        Selamat datang, {session.user.fullname || session.user.name || "Pengguna"}.
                    </p>

                    <Link href="/profile" className={styles.linkButton}>
                        Ke Halaman Profile
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.login}>
            <div className={styles.card}>
                <h1 className={styles.title}>Halaman Login</h1>
                <p className={styles.description}>
                    Login menggunakan credentials untuk membuka halaman profile yang diproteksi middleware.
                </p>

                <form className={styles.form} onSubmit={handleLogin}>
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        value={form.fullname}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className={styles.input}
                    />

                    {error ? <p className={styles.error}>{error}</p> : null}

                    <button type="submit" className={styles.button} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p className={styles.note}>Belum punya akun?</p>
                    <Link href="/auth/register" className={styles.link}>
                        Ke Halaman Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
