import Head from "next/head";
import { useEffect, useState } from "react";
import useProducts from "@/utils/swr/useProducts";
import ProductRenderingList from "@/views/ProductRenderingList";

const CSRProductListPage = () => {
  const { products, isLoading, errorMessage } = useProducts();
  const [generatedAt, setGeneratedAt] = useState<string>();

  useEffect(() => {
    if (!isLoading && !errorMessage) {
      setGeneratedAt(new Date().toISOString());
    }
  }, [errorMessage, isLoading]);

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
        generatedAt={generatedAt}
      />
    </>
  );
};

export default CSRProductListPage;
