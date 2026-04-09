import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/404.module.scss";

const Custom404 = () => {
    return (
        <>
            <Head>
                <title>404 | Halaman Tidak Ditemukan</title>
                <meta name="description" content="Halaman yang Anda cari tidak tersedia atau sudah dipindahkan." />
            </Head>
            <div className={styles.error}>
                <div className={styles.error_card}>
                    <p className={styles.error_badge}>Error 404</p>
                    <h1 className={styles.error_title}>Halaman Tidak Ditemukan</h1>
                    <p className={styles.error_description}>
                        Halaman yang Anda cari tidak tersedia. Periksa kembali URL atau kembali ke halaman utama.
                    </p>
                    <Image
                        src="/page-not-found.png"
                        alt="Ilustrasi halaman tidak ditemukan"
                        className={styles.error_image}
                        width={340}
                        height={240}
                        sizes="(max-width: 768px) 80vw, 340px"
                        priority
                    />
                    <Link href="/" className={styles.error_button}>
                        Kembali ke Home
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Custom404;
