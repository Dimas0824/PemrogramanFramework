import Head from "next/head";
import type { GetServerSideProps } from "next";
import { normalizeProducts, ProductType } from "@/types/Product.type";
import { retrieveProducts } from "@/utils/db/servicefirebase";
import ProductRenderingList from "@/views/ProductRenderingList";

type SSRProductListPageProps = {
  products: ProductType[];
  generatedAt: string;
  errorMessage?: string;
};

const SSRProductListPage = ({
  products,
  generatedAt,
  errorMessage,
}: SSRProductListPageProps) => {
  return (
    <>
      <Head>
        <title>SSR Produk</title>
      </Head>
      <ProductRenderingList
        pageTitle="Daftar Produk dengan SSR"
        pageDescription="Data produk dirender di server setiap request. Klik card untuk membuka detail produk versi SSR."
        renderingLabel="SSR"
        detailBasePath="/rendering/produk/ssr"
        products={products}
        generatedAt={generatedAt}
        errorMessage={errorMessage}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SSRProductListPageProps> = async () => {
  try {
    const products = normalizeProducts(await retrieveProducts("products"));

    return {
      props: {
        products,
        generatedAt: new Date().toISOString(),
      },
    };
  } catch {
    return {
      props: {
        products: [],
        generatedAt: new Date().toISOString(),
        errorMessage: "Gagal memuat daftar produk di server.",
      },
    };
  }
};

export default SSRProductListPage;
