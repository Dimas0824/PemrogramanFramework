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
  errorMessage,
}: {
  products: ProductType[];
  isLoading?: boolean;
  errorMessage?: string;
}) => {
  const skeletonItems = Array.from({ length: 6 });
  const showEmptyState = !isLoading && !errorMessage && products.length === 0;
  const showProducts = !isLoading && !errorMessage && products.length > 0;

  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Produk</h1>

      <div className={styles.produk__content}>
        {errorMessage ? <p className={styles.produk__content__error}>{errorMessage}</p> : null}

        {isLoading
          ? skeletonItems.map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className={styles.produk__content__skeleton}
              aria-hidden="true"
            >
              <div className={styles.produk__content__skeleton__image}></div>
              <div className={styles.produk__content__skeleton__name}></div>
              <div className={styles.produk__content__skeleton__category}></div>
              <div className={styles.produk__content__skeleton__price}></div>
            </div>
          ))
          : showEmptyState
          ? (
            <p className={styles.produk__content__empty}>Belum ada produk untuk ditampilkan.</p>
          )
          : showProducts
          ? products.map((product: ProductType, index: number) => (
            <div
              key={product.id}
              className={styles.produk__content__item}
              style={{ animationDelay: `${Math.min(index, 10) * 70}ms` }}
            >
              <div className={styles.produk__content__item__image}>
                {product.image?.trim() ? (
                  <img src={product.image} alt={product.name} width={200} height={200} />
                ) : (
                  <p className={styles.produk__content__item__fallback}>Gambar belum ada</p>
                )}
              </div>

              <div className={styles.produk__content__item__details}>
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
          ))
          : null}
      </div>
    </div>
  );
};

export default TampilanProduk;
