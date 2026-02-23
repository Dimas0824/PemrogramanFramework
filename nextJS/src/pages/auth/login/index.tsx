import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./login.module.css";

const TampilanLogin = () => {
    const { push } = useRouter();

    const handleLogin = () => {
        localStorage.setItem("isLogin", "true");
        push("/produk");
    }

    return (
        <div className={`${styles.login}`}>
            <div className="bg-white/95 backdrop-blur-md px-8 py-10 rounded-[32px] shadow-2xl w-full max-w-[340px] flex flex-col items-center gap-8 border border-white/40">
                <div className="w-full flex flex-col gap-5 px-2">
                    <button
                        onClick={() => handleLogin()}
                        className="w-full bg-[#111827] text-white py-2.5 rounded-full font-bold text-base hover:bg-slate-800 transition-all cursor-pointer shadow-md active:scale-95"
                    >
                        Login
                    </button>
                    <div className="text-center text-slate-500 text-sm font-medium">
                        <h1 style={{ color: "red", border: "1px solid red", borderRadius: "5px", padding: "5px" }}> belum punya akun</h1>
                        <Link href="/auth/register" className="text-blue-600 hover:underline">Ke Halaman Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TampilanLogin;