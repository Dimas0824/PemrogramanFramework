export type ProductType = {
    id: string
    name: string
    price: number
    image: string
    category: string
}

type ProductViewProps = {
    products: ProductType[]
    isLoading: boolean
    errorMessage: string
}

const currencyFormatter = new Intl.NumberFormat("id-ID");

const ProductView = ({ products, isLoading, errorMessage }: ProductViewProps) => {

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
            <div className="mb-8 flex items-end justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Product Catalog
                    </p>
                    <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                        Daftar Produk
                    </h1>
                </div>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {products.length} Produk
                </span>
            </div>

            {errorMessage && (
                <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
                    {errorMessage}
                </p>
            )}

            {isLoading ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    Memuat data produk...
                </div>
            ) : products.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    Belum ada data produk.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <article
                            key={product.id}
                            className="group mx-auto w-full max-w-[250px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                        >
                            {product.image?.trim() ? (
                                <div className="aspect-[5/4] w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            ) : (
                                <div className="flex aspect-[5/4] w-full items-center justify-center bg-slate-100 px-4 text-center text-xs font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                                    Belum ada gambar untuk produk ini
                                </div>
                            )}

                            <div className="space-y-2.5 p-3">
                                <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                                    {product.category}
                                </span>

                                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                    {product.name}
                                </h2>

                                <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                                    Rp {currencyFormatter.format(product.price)}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProductView;
