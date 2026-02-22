import Link from "next/link";

const HalamanRegister = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-blue-300 to-blue-100 p-4">
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full max-w-sm flex flex-col items-center gap-6 border border-white/20 text-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
                </div>
                <div className="w-full flex flex-col gap-4 mt-2">
                    <div className="text-center text-sm text-gray-500">
                        <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">Login ke Akun</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HalamanRegister;