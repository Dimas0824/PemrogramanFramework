import TampilanProduk from "../../views/product";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";
import type { ProductType } from "@/types/Product.type";

type ApiProductsResponse = {
    status: boolean;
    status_code: number;
    message?: string;
    data: ProductType[];
};

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

const kategori = () => {
    const isTestEnv = process.env.NODE_ENV === "test";

    const { data, error, isLoading } = useSWR<ApiProductsResponse>(
        isTestEnv ? null : "/api/produk",
        fetcher,
        {
            revalidateOnFocus: !isTestEnv,
            revalidateOnReconnect: !isTestEnv,
        },
    );

    return (
        <div>
            <TampilanProduk
                products={data?.data ?? []}
                isLoading={isLoading}
                errorMessage={error ? "Gagal memuat produk." : undefined}
            />
        </div>
    );
};

export default kategori;
