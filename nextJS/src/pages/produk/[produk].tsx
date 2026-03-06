import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduk from "../../views/DetailProduct";
import { ProductType } from "@/types/Product.type";

const HalamanProduk = ({ product }: { product: ProductType }) => {
    //digunakan client-side rendering/
    // const Router = useRouter();
    // console.log(Router);

    // const { query } = useRouter();
    // const { data, error, isLoading } = useSWR(
    //   `/api/products/${query.produk}`,
    //   fetcher,
    // );
    // return (
    //   <div>
    //     <DetailProduk products={isLoading ? [] : data.data} />
    //   </div>
    // );

    return (
        <div>
            <DetailProduk products={product} />
        </div>
    );
};

export default HalamanProduk;

// Fungsi getServerSideProps akan dipanggil setiap kali halaman ini diakses, dan akan mengambil data produk berdasarkan parameter dinamis di URL.
//digunakan server-side rendering/
export async function getServerSideProps({ params }: { params: { produk: string } }) {
    const res = await fetch(`http://localhost:3000/api/produk/${params.produk}`);
    const respone = await res.json();
    // console.log("Data produk yang diambil dari API:", respone);

    return {
        props: {
            product: respone.data, // Pastikan untuk memberikan nilai default jika data tidak tersedia
        },
    };
}