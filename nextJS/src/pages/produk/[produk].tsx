import type { GetServerSideProps } from "next";
import DetailProduk from "../../views/DetailProduct";
import { normalizeProduct, ProductType } from "@/types/Product.type";
import { retrieveDataByID } from "@/utils/db/servicefirebase";

type ProductDetailPageProps = {
    product: ProductType;
};

const HalamanProduk = ({ product }: ProductDetailPageProps) => {
    //digunakan client-side rendering/
    // const Router = useRouter();

    return (
        <div>
            <DetailProduk products={product} />
        </div>
    );
};

export default HalamanProduk;

export const getServerSideProps: GetServerSideProps<ProductDetailPageProps> = async ({
    params,
}) => {
    const productId = typeof params?.produk === "string" ? params.produk : "";

    if (!productId) {
        return {
            notFound: true,
        };
    }

    try {
        const rawProduct = await retrieveDataByID("products", productId);
        const product = rawProduct ? normalizeProduct(rawProduct) : null;

        if (!product) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                product,
            },
        };
    } catch {
        return {
            notFound: true,
        };
    }
};
