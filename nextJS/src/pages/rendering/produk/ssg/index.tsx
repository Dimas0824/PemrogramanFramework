import Head from "next/head";
import type { GetStaticProps } from "next";
import { normalizeProducts, ProductType } from "@/types/Product.type";
import { retrieveProducts } from "@/utils/db/servicefirebase";
import ProductRenderingList from "@/views/ProductRenderingList";

type SSGProductListPageProps = {
  products: ProductType[];
  generatedAt: string;
  errorMessage?: string;
};

const SSGProductListPage = ({
  products,
  generatedAt,
  errorMessage,
}: SSGProductListPageProps) => {
  return (
    <>
      <Head>
        <title>SSG Produk</title>
      </Head>
      <ProductRenderingList
        pageTitle="Daftar Produk dengan SSG"
        pageDescription="Data produk dibuat saat build time sebagai halaman statis penuh. Klik card untuk membuka detail produk versi SSG."
        renderingLabel="SSG"
        detailBasePath="/rendering/produk/ssg"
        products={products}
        generatedAt={generatedAt}
        errorMessage={errorMessage}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<SSGProductListPageProps> = async () => {
  try {
    const products = normalizeProducts(await retrieveProducts("products"));

    return {
      props: {
        products,
        generatedAt: new Date().toISOString(),
      },
      revalidate: 60,
    };
  } catch {
    return {
      props: {
        products: [],
        generatedAt: new Date().toISOString(),
        errorMessage: "Gagal memuat daftar produk statis.",
      },
      revalidate: 60,
    };
  }
};

export default SSGProductListPage;
