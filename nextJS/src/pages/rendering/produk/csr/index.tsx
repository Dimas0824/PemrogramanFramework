import Head from "next/head";
import useProducts from "@/utils/swr/useProducts";
import ProductRenderingList from "@/views/ProductRenderingList";

const CSRProductListPage = () => {
  const { products, isLoading, errorMessage } = useProducts();

  return (
    <>
      <Head>
        <title>CSR Produk</title>
      </Head>
      <ProductRenderingList
        pageTitle="Daftar Produk dengan CSR"
        pageDescription="Data produk dimuat di browser. Klik salah satu card untuk membuka detail produk versi CSR."
        renderingLabel="CSR"
        detailBasePath="/rendering/produk/csr"
        products={products}
        isLoading={isLoading}
        errorMessage={errorMessage}
        generatedAt={!isLoading && !errorMessage ? new Date().toISOString() : undefined}
      />
    </>
  );
};

export default CSRProductListPage;
