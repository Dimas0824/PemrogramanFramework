import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from '@/components/layouts/navbar'
import React from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ flex: 1 }}>
        <Component {...pageProps} />
      </div>

      <div style={{ padding: '1rem', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        footer
      </div>
    </main>
  )
}
