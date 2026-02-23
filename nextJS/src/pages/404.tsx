import styles from "@/styles/404.module.scss";

const Custom404 = () => {
    return (
        <div className={styles.error}>
            <h1>404 - Halaman Tidak Ditemukan</h1>
            <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
        </div>
    );
};

export default Custom404;
