// import { Router, useRouter } from "next/router";
// import fetcher from "@/utils/swr/fetcher";
// import useSWR from "swr";

// const HalamanProduk = () => {
//     // const router = useRouter();
//     // console.log(router);
//     const { query } = useRouter();
//     const { data, error, isLoading } = useSWR(
//         query.produk ? `/api/produk/${query.produk}` : null,
//         fetcher
//     );
//     return (
//         <div>
//             Halaman Produk
//             <p>
//                 Produk: {query.produk}
//             </p>
//         </div>
//     )
// }

// export default HalamanProduk;

import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduk from "../../views/DetailProduct";
import { ProductType } from "@/types/Product.type";

type ProductApiResponse = {
    status: boolean;
    status_code: number;
    data: ProductType;
};

const HalamanProduk = () => {
    // const Router = useRouter();
    // console.log(Router);
    const { query } = useRouter();
    const productSlug = Array.isArray(query.produk) ? query.produk[0] : query.produk;

    const { data, error, isLoading } = useSWR<ProductApiResponse>(
        productSlug ? `/api/produk/${productSlug}` : null,
        fetcher
    );

    if (isLoading || !data?.data) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Gagal memuat data produk.</div>;
    }

    return (
        <div style={{ padding: "16px" }}>
            <p style={{ marginBottom: "12px", fontWeight: "bolder", fontSize: "24px" }}>
                Detail Produk
            </p>
            <DetailProduk products={data.data} />
        </div>
    );
};

export default HalamanProduk;
