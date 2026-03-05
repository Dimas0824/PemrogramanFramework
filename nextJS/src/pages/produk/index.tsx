import ProductView from "@/views/product";
import useProducts from "../../utils/swr/useProducts";

const ProdukPage = () => {
    const { products, isLoading, errorMessage } = useProducts();

    return (
        <ProductView
            products={products}
            isLoading={isLoading}
            errorMessage={errorMessage}
        />
    );
};

export default ProdukPage;
