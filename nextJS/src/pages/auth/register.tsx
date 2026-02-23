import Link from "next/link";
import styles from "./register.module.scss";

const HalamanRegister = () => {
    return (
        <div className={styles.register}>
            <div className={styles.card}>
                <h1 className={styles.title}>Halaman Register</h1>
                <form className={styles.form}>
                    <input type="text" placeholder="Nama Lengkap" className={styles.input} />
                    <input type="email" placeholder="Email" className={styles.input} />
                    <input type="password" placeholder="Password" className={styles.input} />
                    <input type="password" placeholder="Konfirmasi Password" className={styles.input} />
                    <button type="button" className={styles.button}>
                        Daftar
                    </button>
                </form>
                <p className={styles.subtitle}>Sudah punya akun?</p>
                <Link href="/auth/login" className={styles.link}>
                    Login ke Akun
                </Link>
            </div>
        </div>
    );
};

export default HalamanRegister;
