import ProductView, { ProductType } from "@/views/product";
import useSWR from "swr";
import fetcher from "../utils/swr/fetcher";

type ApiProductsResponse = {
    status: boolean;
    status_code: number;
    message?: string;
    data: ProductType[];
};

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProdukPage = () => {
    const { data, error, isLoading } = useSWR<ApiProductsResponse>("/api/produk", fetcher);
    const hasApiError = Boolean(error || (data && !data.status));
    const isPageLoading = isLoading && !data;
    const products = hasApiError || isPageLoading ? [] : (data?.data ?? []);

    return (
        <ProductView
            products={products}
            isLoading={isPageLoading}
            errorMessage={hasApiError ? "Gagal memuat data produk. Silakan coba lagi." : undefined}
        />
    );
};

export default ProdukPage;
