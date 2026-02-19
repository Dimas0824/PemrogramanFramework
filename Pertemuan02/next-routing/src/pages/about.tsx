
import Head from 'next/head'
import Link from 'next/link'

export default function About() {
    return (
        <>
            <Head>
                <title>About — Next Routing</title>
                <meta name="description" content="About page for Next Routing demo." />
            </Head>

            <main style={{ maxWidth: 800, margin: '4rem auto', padding: '0 1rem' }}>
                <h1>Ini adalah halaman About</h1>
                <p>
                    <Link href="/">← Back to Home</Link>
                </p>
            </main>
        </>
    )
}
