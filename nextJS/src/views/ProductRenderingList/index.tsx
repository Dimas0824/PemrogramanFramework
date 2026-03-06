import Link from "next/link";
import { ProductType } from "@/types/Product.type";
import ProductRenderingNav from "@/components/rendering/ProductRenderingNav";
import styles from "./ProductRenderingList.module.scss";

type ProductRenderingListProps = {
  pageTitle: string;
  pageDescription: string;
  renderingLabel: "CSR" | "SSR" | "SSG";
  detailBasePath: string;
  products: ProductType[];
  generatedAt?: string;
  isLoading?: boolean;
  errorMessage?: string;
};

const formatRupiah = (value: number) => {
  return value.toLocaleString("id-ID");
};

const formatGeneratedAt = (value?: string) => {
  if (!value) return null;

  return new Date(value).toLocaleString("id-ID", {
    dateStyle: "full",
    timeStyle: "medium",
  });
};

const ProductRenderingList = ({
  pageTitle,
  pageDescription,
  renderingLabel,
  detailBasePath,
  products,
  generatedAt,
  isLoading = false,
  errorMessage,
}: ProductRenderingListProps) => {
  const generatedLabel = formatGeneratedAt(generatedAt);

  return (
    <section className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div className={styles.heroMain}>
            <p className={styles.eyebrow}>Daftar Produk</p>
            <h1 className={styles.title}>{pageTitle}</h1>
            <p className={styles.description}>{pageDescription}</p>
          </div>

          <aside className={styles.heroSide}>
            <div className={styles.metaCard}>
              <p className={styles.metaLabel}>Ringkasan Halaman</p>
              <div className={styles.meta}>
                <span className={styles.badge}>Metode: {renderingLabel}</span>
                {generatedLabel ? <span className={styles.badge}>Data dibuat: {generatedLabel}</span> : null}
              </div>
            </div>
          </aside>
        </header>

        <div className={styles.toolbar}>
          <ProductRenderingNav />
        </div>

        <div className={styles.contentPanel}>
          {isLoading ? (
            <p className={styles.status}>Memuat daftar produk...</p>
          ) : errorMessage ? (
            <p className={styles.error}>{errorMessage}</p>
          ) : products.length === 0 ? (
            <p className={styles.empty}>Belum ada produk untuk ditampilkan.</p>
          ) : (
            <div className={styles.grid}>
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`${detailBasePath}/${product.id}`}
                  className={styles.card}
                >
                  <div className={styles.imageWrap}>
                    {product.image?.trim() ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <p className={styles.fallback}>Gambar belum tersedia</p>
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <p className={styles.category}>{product.category}</p>
                    <h2 className={styles.name}>{product.name}</h2>
                    <p className={styles.price}>Rp {formatRupiah(product.price)}</p>
                    <p className={styles.hint}>Klik untuk buka detail produk</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductRenderingList;
