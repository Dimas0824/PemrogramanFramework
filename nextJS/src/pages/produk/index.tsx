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

    const products = isLoading ? [] : (data?.data ?? []);
    if (error || (data && !data.status)) {
        return <div>Gagal memuat data produk.</div>;
    }

    return <ProductView products={products} isLoading={isLoading} />;
};

export default ProdukPage;
