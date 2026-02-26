import styles from "../../pages/produk/product.module.scss";

export type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const TampilanProduk = ({
  products,
  isLoading = false,
}: {
  products: ProductType[];
  isLoading?: boolean;
}) => {
  const skeletonItems = Array.from({ length: 6 });

  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Produk</h1>

      <div className={styles.produk__content}>
        {isLoading
          ? skeletonItems.map((_, index) => (
            <div key={`skeleton-${index}`} className={styles.produk__content__skeleton}>
              <div className={styles.produk__content__skeleton__image}></div>
              <div className={styles.produk__content__skeleton__name}></div>
              <div className={styles.produk__content__skeleton__category}></div>
              <div className={styles.produk__content__skeleton__price}></div>
            </div>
          ))
          : products.map((product: ProductType) => (
            <div key={product.id} className={styles.produk__content__item}>
              <div className={styles.produk__content__item__image}>
                {product.image?.trim() ? (
                  <img src={product.image} alt={product.name} width={200} height={200} />
                ) : (
                  <p style={{ color: "#888", textAlign: "center" }}>Gambar belum ada</p>
                )}
              </div>

              <div>
                <h4 className={styles.produk__content__item__name}>
                  {product.name}
                </h4>

                <p className={styles.produk__content__item__category}>
                  {product.category}
                </p>

                <p className={styles.produk__content__item__price}>
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TampilanProduk;