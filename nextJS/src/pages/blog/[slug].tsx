import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { JSX } from 'react'

export default function BlogPost(): JSX.Element {
    const router = useRouter()
    const { slug } = router.query

    if (!router.isReady) return <p>Loading...</p>

    return (
        <>
            <Head>
                <title>Blog – {slug}</title>
            </Head>

            <main className="max-w-2xl mx-auto py-12 px-4 text-black">
                <p className="text-sm text-gray-600 mb-2">Dynamic routing – Blog</p>
                <h1 className="text-3xl font-semibold mb-4">Postingan: {slug}</h1>
                <p className="text-gray-700 mb-6">
                    Ini contoh halaman dynamic routing dinamis dengan parameter <span className="font-mono">{slug}</span>.
                </p>
                <Link href="/">← Kembali ke Home</Link>
            </main>
        </>
    )
}