import { useEffect, useState } from "react";

type ProductType =
    {
        id: string;
        name: string
        price: number
        size: string
        category: string
    }

const currencyFormatter = new Intl.NumberFormat("id-ID");

const getSizeTone = (size: string) => {
    const normalizedSize = size.toUpperCase();

    if (normalizedSize === "S") return "bg-emerald-400/20 text-emerald-200 ring-1 ring-emerald-300/40";
    if (normalizedSize === "M") return "bg-sky-400/20 text-sky-200 ring-1 ring-sky-300/40";
    if (normalizedSize === "L") return "bg-violet-400/20 text-violet-200 ring-1 ring-violet-300/40";
    if (normalizedSize === "XL") return "bg-amber-400/20 text-amber-200 ring-1 ring-amber-300/40";
    return "bg-slate-400/20 text-slate-200 ring-1 ring-slate-300/40";
};

const kategori = () => {
    // const [isLogin, setIsLogin] = useState(false);
    // const { push } = useRouter();
    const [products, setProducts] = useState<ProductType[]>([]);

    // useEffect(() => {
    //   if (!isLogin) {
    //     push("/auth/login");
    //   }
    // },[]);

    useEffect(() => {
        fetch("/api/produk")
            .then((response) => response.json())
            .then((responsedata) => {
                //console.log("Data produk:", responsedata.data);
                setProducts(responsedata.data);
            })
            .catch((error) => {
                console.error("Error fetching produk:", error);
            });
    }, []);

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Inventory
                    </p>
                    <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                        Daftar Produk
                    </h1>
                </div>

                <div className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {products.length} Produk
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                        <thead className="bg-slate-50 dark:bg-slate-900/50">
                            <tr>
                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                    Nama Produk
                                </th>
                                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                    Harga
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                    Kategori
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                    Ukuran
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-700 dark:bg-slate-800">
                            {products.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-5 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                                    >
                                        Belum ada data produk.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product, idx) => (
                                    <tr
                                        key={product.id}
                                        className={[
                                            idx % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-slate-50/50 dark:bg-slate-900/50",
                                            "hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors",
                                        ].join(" ")}
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-slate-100 text-xs font-bold uppercase text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                                                    {product.name.slice(0, 2)}
                                                </span>
                                                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                                    {product.name}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-right text-sm font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                                            Rp {currencyFormatter.format(product.price)}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-700 dark:text-slate-300">
                                            {product.category}
                                        </td>

                                        <td className="px-5 py-4 text-center">
                                            <span
                                                className={[
                                                    "inline-flex min-w-12 items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase",
                                                    "border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300",
                                                    // optional: keep your tone function but make it softer
                                                    // getSizeTone(product.size),
                                                ].join(" ")}
                                            >
                                                {product.size}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default kategori;
