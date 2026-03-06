import { Router, useRouter } from "next/router";
import fetcher from "@/utils/swr/fetcher";
import useSWR from "swr";

const HalamanProduk = () => {
    // const router = useRouter();
    // console.log(router);
    const { query } = useRouter();
    const { data, error, isLoading } = useSWR(
        query.produk ? `/api/produk/${query.produk}` : null,
        fetcher
    );
    return (
        <div>
            Halaman Produk
            <p>
                Produk: {query.produk}
            </p>
        </div>
    )
}

export default HalamanProduk;
