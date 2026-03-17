import Head from 'next/head'
import Link from 'next/link'
import React, { JSX } from 'react'
import { useSession } from 'next-auth/react';

export default function Profile(): JSX.Element {
    const { data }: any = useSession();

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>

            <main className="max-w-2xl mx-auto py-12 px-4">
                <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gray-50 border-b border-gray-200 px-8 py-6">
                        <h1 className="text-2xl font-bold text-gray-800">Profil Pengguna</h1>
                        <p className="text-sm text-gray-500 mt-1">Informasi detail akun Anda</p>
                    </div>

                    <div className="p-0">
                        <table className="w-full text-left border-collapse">
                            <tbody>
                                <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <th className="px-8 py-5 font-semibold text-gray-600 bg-gray-50/50 w-1/3">Nama Lengkap</th>
                                    <td className="px-8 py-5 text-gray-800 font-medium">{data?.user?.fullname || "-"}</td>
                                </tr>
                                <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <th className="px-8 py-5 font-semibold text-gray-600 bg-gray-50/50">Email</th>
                                    <td className="px-8 py-5 text-gray-800">{data?.user?.email || "-"}</td>
                                </tr>
                                <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <th className="px-8 py-5 font-semibold text-gray-600 bg-gray-50/50">Nomor Absen</th>
                                    <td className="px-8 py-5 text-gray-800">14</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-gray-50 border-t border-gray-200 px-8 py-6 flex justify-end">
                        <Link href="/profile/edit" className="inline-flex items-center justify-center px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Profil
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}
