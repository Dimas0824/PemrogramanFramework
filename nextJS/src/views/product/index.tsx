import styles from "../../pages/produk/product.module.scss";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/types/Product.type";
import { ReactNode } from "react";

const formatRupiah = (value: unknown): string => {
  const parsed = Number(value);
  const safeValue = Number.isFinite(parsed) ? parsed : 0;
  return safeValue.toLocaleString("id-ID");
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
  const skeletonItems = Array.from({ length: 6 }, (_, index) => `skeleton-${index + 1}`);
  const showEmptyState = !isLoading && !errorMessage && products.length === 0;
  const showProducts = !isLoading && !errorMessage && products.length > 0;

  let content: ReactNode = null;

  if (isLoading) {
    content = skeletonItems.map((skeletonId) => (
      <div
        key={skeletonId}
        className={styles.produk__content__skeleton}
        aria-hidden="true"
      >
        <div className={styles.produk__content__skeleton__image}></div>
        <div className={styles.produk__content__skeleton__name}></div>
        <div className={styles.produk__content__skeleton__category}></div>
        <div className={styles.produk__content__skeleton__price}></div>
      </div>
    ));
  } else if (showEmptyState) {
    content = <p className={styles.produk__content__empty}>Belum ada produk untuk ditampilkan.</p>;
  } else if (showProducts) {
    content = products.map((product: ProductType, index: number) => (
      <Link
        href={`/produk/${product.id}`}
        key={product.id}
        className={styles.produk__content__item}
        style={{ animationDelay: `${Math.min(index, 10) * 70}ms` }}
      >
        <div className={styles.produk__content__item__image}>
          {product.image?.trim() ? (
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 220px"
              className={styles.productImage}
            />
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
            Rp {formatRupiah(product.price)}
          </p>
        </div>
      </Link>
    ));
  }

  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title} data-testid="title">Product Page</h1>

      <div className={styles.produk__content}>
        {errorMessage ? <p className={styles.produk__content__error}>{errorMessage}</p> : null}

        {content}
      </div>
    </div>
  );
};

export default TampilanProduk;
