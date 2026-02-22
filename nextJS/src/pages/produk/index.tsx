import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProdukPage = () => {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const isLogin = localStorage.getItem("isLogin") === "true";

        if (!isLogin) {
            router.replace("/auth/login");
            return;
        }

        setIsCheckingAuth(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("isLogin");
        router.push("/auth/login");
    };

    if (isCheckingAuth) return null;

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
                <h1 className="text-2xl font-bold text-slate-900">Produk User Page</h1>
                <p className="mt-2 text-sm text-slate-600">Anda berhasil masuk ke halaman produk.</p>
                <button
                    onClick={handleLogout}
                    className="mt-5 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                    Logout ke Login
                </button>
            </div>
        </div>
    )
}

export default ProdukPage;
