import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProdukView from "@/views/produk";

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

    return <ProdukView onLogout={handleLogout} />;
};

export default ProdukPage;
