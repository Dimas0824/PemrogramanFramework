import TampilanProduk from "../../views/product";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";
import type { ProductType } from "@/types/Product.type";
import { useEffect } from "react";
import { useRouter } from "next/router";

type ApiProductsResponse = {
    status: boolean;
    status_code: number;
    message?: string;
    data: ProductType[];
};

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

const kategori = () => {
    const isTestEnv = process.env.NODE_ENV === "test";
    const { asPath } = useRouter();

    const { data, error, isLoading } = useSWR<ApiProductsResponse>(
        isTestEnv ? null : "/api/produk",
        fetcher,
        {
            revalidateOnFocus: !isTestEnv,
            revalidateOnReconnect: !isTestEnv,
        },
    );

    useEffect(() => {
        console.info("[ProductsPage] SWR snapshot", {
            path: asPath,
            isLoading,
            hasError: Boolean(error),
            errorMessage: error instanceof Error ? error.message : null,
            status: data?.status,
            statusCode: data?.status_code,
            productCount: data?.data?.length ?? 0,
            firstProductId: data?.data?.[0]?.id ?? null,
        });
    }, [asPath, data, error, isLoading]);

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
