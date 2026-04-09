// import { ProductType } from "@/types/Product.type";
import Image from "next/image";
import { ProductType } from "../../types/Product.type";
import styles from "./DetailProduct.module.scss";

const DetailProduk = ({ products }: { products: ProductType }) => {
    const hasProductImage = Boolean(products.image?.trim());

    return (
        <>
            <h1 className={styles.title}>Detail Produk</h1>
            <div className={styles.produkdetail}>
                <div className={styles.produkdetail__image}>
                    {hasProductImage ? (
                        <Image
                            src={products.image}
                            alt={products.name}
                            width={900}
                            height={900}
                            sizes="(max-width: 768px) 100vw, 45vw"
                            className={styles.productImage}
                        />
                    ) : (
                        <p className={styles.imageFallback}>Gambar produk belum tersedia.</p>
                    )}
                </div>

                <div className={styles.produkdetail__info}>
                    <h1 className={styles.produkdetail__name}>{products.name}</h1>
                    <p className={styles.produkdetail__category}>{products.category}</p>
                    <p className={styles.produkdetail__price}>
                        Rp {products.price.toLocaleString("id-ID")}
                    </p>
                </div>
            </div>
        </>
    );
};

export default DetailProduk;
