import { Router, useRouter } from "next/router";

const HalamanProduk = () => {
    const router = useRouter();
    console.log(Router);
    return (
        <div>
            Halaman Produk
            <p>
                Produk: {router.query.id}
            </p>
        </div>
    )
}

export default HalamanProduk;