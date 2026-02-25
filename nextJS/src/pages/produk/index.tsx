import ProductView, { ProductType } from "@/views/product";
import { useEffect, useState } from "react";

type ApiProductsResponse = {
    status: boolean
    status_code: number
    data: ProductType[]
}

const ProdukPage = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const response = await fetch("/api/products");
                if (!response.ok) {
                    throw new Error(`Request gagal dengan status ${response.status}`);
                }

                const responseData: ApiProductsResponse = await response.json();
                setProducts(responseData.data ?? []);
            } catch (error) {
                console.error("Error fetching products:", error);
                setErrorMessage("Gagal memuat data produk.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    return <ProductView products={products} />;
};

export default ProdukPage;
