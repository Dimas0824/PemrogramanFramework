import Link from "next/link";

export default function About() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-6">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
                    Ini adalah halaman About
                </h1>

                <div className="space-y-3 text-gray-700 leading-relaxed">
                    <p>
                        <span className="font-semibold">Nama:</span> Muhammad Irsyad Dimas Abdillah
                    </p>
                    <p>
                        <span className="font-semibold">NIM:</span> 2341720088
                    </p>
                    <p>
                        <span className="font-semibold">Kelas:</span> TI-3F
                    </p>
                </div>

                <div className="mt-6 text-gray-600 leading-relaxed">
                    <p>
                        Saya merupakan mahasiswa D4 Pengembangan Web yang saat ini
                        mempelajari dan mengembangkan aplikasi menggunakan Next.js.
                    </p>
                </div>

                <div className="mt-8">
                    <Link
                        href="/"
                        className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                    >
                        Kembali ke Home
                    </Link>
                </div>
            </div>
        </main>
    );
}