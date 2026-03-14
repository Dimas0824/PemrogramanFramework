import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/pages/auth/login/login.module.scss";

const LoginPage = () => {
    const router = useRouter();

    const handleLogin = () => {
        const redirectTo = typeof router.query.from === "string" ? router.query.from : "/products";

        document.cookie = "isLogin=true; path=/; max-age=86400; samesite=lax";
        localStorage.setItem("isLogin", "true");
        router.push(redirectTo);
    };

    return (
        <div className={styles.login}>
            <div className={styles.card}>
                <h1 className={styles.title}>Halaman Login</h1>
                <p className={styles.description}>
                    Login untuk membuka halaman yang diproteksi oleh middleware.
                </p>

                <button onClick={handleLogin} className={styles.button}>
                    Login
                </button>

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
