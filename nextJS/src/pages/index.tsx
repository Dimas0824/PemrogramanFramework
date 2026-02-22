import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={inter.className}>
      <h1>Praktikum Next.js Pages Router</h1>
      <p>Mahasiswa D4 Pengembangan Web</p>
    </div>
  );
}