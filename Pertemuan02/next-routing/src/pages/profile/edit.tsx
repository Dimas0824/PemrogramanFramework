import Head from 'next/head'
import Link from 'next/link'
import React, { JSX } from 'react'

export default function EditProfile(): JSX.Element {
    return (
        <>
            <Head>
                <title>Edit Profile</title>
            </Head>

            <main className="max-w-2xl mx-auto py-12 px-4">
                <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gray-50 border-b border-gray-200 px-8 py-6">
                        <h1 className="text-2xl font-bold text-gray-800 text-center">Modifikasi Profil</h1>
                    </div>

                    <form className="p-0">
                        <table className="w-full text-left">
                            <tbody>
                                <tr className="border-b border-gray-100 last:border-0">
                                    <th className="px-8 py-5 font-semibold text-gray-600 bg-gray-50/50 w-1/4">Nama</th>
                                    <td className="px-8 py-5 text-gray-800">
                                        <input
                                            defaultValue="Muhammad Irsyad Dimas Abdillah"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                        />
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100 last:border-0">

                                </tr>
                            </tbody>
                        </table>

                        <div className="flex items-center justify-center gap-6 px-8 py-6 bg-gray-50 border-t border-gray-200">
                            <button
                                type="submit"
                                className="px-8 py-2.5 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 active:scale-95 transition-all duration-200"
                            >
                                Simpan
                            </button>
                            <Link
                                href="/profile"
                                className="px-8 py-2.5 border border-red-500 text-red-600 font-bold rounded-lg hover:bg-red-50 active:scale-95 transition-all duration-200"
                            >
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}
