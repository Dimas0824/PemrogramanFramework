import Link from "next/link";
import { ProductType } from "@/types/Product.type";
import ProductRenderingNav from "@/components/rendering/ProductRenderingNav";
import styles from "./DetailProductRendering.module.scss";

type DetailProductRenderingProps = {
  pageTitle: string;
  pageDescription: string;
  renderingLabel: "CSR" | "SSR" | "SSG";
  productId?: string;
  product?: ProductType | null;
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

const DetailProductRendering = ({
  pageTitle,
  pageDescription,
  renderingLabel,
  productId,
  product,
  generatedAt,
  isLoading = false,
  errorMessage,
}: DetailProductRenderingProps) => {
  const activeProductId = product?.id ?? productId;
  const generatedLabel = formatGeneratedAt(generatedAt);
  const listHref = `/rendering/produk/${renderingLabel.toLowerCase()}`;

  return (
    <section className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div className={styles.heroMain}>
            <p className={styles.eyebrow}>Halaman Detail Produk</p>
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
            <div className={styles.statusCard}>
              <p className={styles.statusText}>Memuat detail produk dari browser...</p>
            </div>
          ) : errorMessage ? (
            <div className={styles.statusCard}>
              <p className={styles.errorText}>{errorMessage}</p>
            </div>
          ) : product ? (
            <article className={styles.detailCard}>
              <div className={styles.imagePanel}>
                {product.image?.trim() ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <p className={styles.imageFallback}>Gambar produk belum tersedia.</p>
                )}
              </div>

              <div className={styles.content}>
                <p className={styles.productCategory}>{product.category}</p>
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productPrice}>Rp {formatRupiah(product.price)}</p>
                <p className={styles.productId}>ID Produk: {product.id}</p>

                {activeProductId ? (
                  <div className={styles.methodLinks}>
                    <Link href={listHref} className={styles.methodLink}>
                      Kembali ke daftar {renderingLabel}
                    </Link>
                    <Link href={`/rendering/produk/csr/${activeProductId}`} className={styles.methodLink}>
                      Lihat versi CSR
                    </Link>
                    <Link href={`/rendering/produk/ssr/${activeProductId}`} className={styles.methodLink}>
                      Lihat versi SSR
                    </Link>
                    <Link href={`/rendering/produk/ssg/${activeProductId}`} className={styles.methodLink}>
                      Lihat versi SSG
                    </Link>
                  </div>
                ) : null}
              </div>
            </article>
          ) : (
            <div className={styles.statusCard}>
              <p className={styles.statusText}>Produk tidak ditemukan.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailProductRendering;
