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
            const startedAt = Date.now();
            const minimumLoadingTime = 1200;

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
                const elapsed = Date.now() - startedAt;
                const remaining = minimumLoadingTime - elapsed;

                if (remaining > 0) {
                    await new Promise((resolve) => setTimeout(resolve, remaining));
                }

                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    return <ProductView products={products} isLoading={isLoading} />;
};

export default ProdukPage;
