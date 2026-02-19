import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>praktikum Next.js Pages Router</h1>
      <p>Mahasiswa D4 Pengembangan Web</p>
      <p>
        <Link href="/about">About Me</Link>
      </p>
    </main>
  );
}
