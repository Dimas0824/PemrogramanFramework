import Link from "next/link";

const HalamanRegister = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-blue-300 to-blue-100 p-4">
            <div className="w-full max-w-sm rounded-3xl border border-white/20 bg-white/80 p-8 text-center shadow-xl backdrop-blur-lg">
                <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
                <p className="mt-2 text-sm text-gray-500">Sudah punya akun?</p>
                <Link href="/auth/login" className="mt-2 inline-block font-medium text-blue-600 hover:underline">
                    Login ke Akun
                </Link>
            </div>
        </div>
    )
}

export default HalamanRegister;
