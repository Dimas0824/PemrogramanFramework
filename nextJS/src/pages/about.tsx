import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/about.module.scss'

const AboutPage = () => {
    return (
        <>
            <Head>
                <title>About — Next Routing</title>
                <meta name="description" content="About page for Next Routing demo." />
            </Head>

            <main className={styles.page}>
                <div className={styles.container}>
                    <section className={styles.card}>
                        <p className={styles.eyebrow}>About Page</p>
                        <h1 data-testid="title" className={styles.title}>About Page</h1>
                        <p className={styles.description}>
                            Halaman ini dibuat untuk demonstrasi routing Next.js dan proteksi route menggunakan middleware.
                            Saat user belum login, akses ke halaman ini akan diarahkan ke halaman login terlebih dahulu.
                        </p>

                        <div className={styles.grid}>
                            <div className={styles.infoBox}>
                                <p className={styles.infoLabel}>Framework</p>
                                <p className={styles.infoValue}>Next.js Pages Router</p>
                            </div>

                            <div className={styles.infoBox}>
                                <p className={styles.infoLabel}>Proteksi</p>
                                <p className={styles.infoValue}>Middleware dengan cookie login</p>
                            </div>

                            <div className={styles.infoBox}>
                                <p className={styles.infoLabel}>Tujuan</p>
                                <p className={styles.infoValue}>Membatasi akses ke route tertentu</p>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <Link href="/" className={styles.primaryLink}>Back to Home</Link>
                            <Link href="/products" className={styles.secondaryLink}>Lihat Products</Link>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default AboutPage;
