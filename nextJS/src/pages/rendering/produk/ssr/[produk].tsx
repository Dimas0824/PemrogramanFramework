import Head from "next/head";
import type { GetServerSideProps } from "next";
import DetailProductRendering from "@/views/DetailProductRendering";
import { normalizeProduct, ProductType } from "@/types/Product.type";
import { retrieveDataByID } from "@/utils/db/servicefirebase";

type SSRProductDetailPageProps = {
  productId: string;
  product: ProductType | null;
  generatedAt: string;
  errorMessage?: string;
};

const SSRProductDetailPage = ({
  productId,
  product,
  generatedAt,
  errorMessage,
}: SSRProductDetailPageProps) => {
  return (
    <>
      <Head>
        <title>SSR Detail Produk</title>
      </Head>
      <DetailProductRendering
        pageTitle="Detail Produk dengan SSR"
        pageDescription="Data produk dirender penuh di server pada setiap request menggunakan getServerSideProps."
        renderingLabel="SSR"
        productId={productId}
        product={product}
        generatedAt={generatedAt}
        errorMessage={errorMessage}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SSRProductDetailPageProps> = async ({
  params,
}) => {
  const productId = typeof params?.produk === "string" ? params.produk : "";

  if (!productId) {
    return { notFound: true };
  }

  try {
    const rawProduct = await retrieveDataByID("products", productId);
    const product = rawProduct ? normalizeProduct(rawProduct) : null;

    if (!product) {
      return { notFound: true };
    }

    return {
      props: {
        productId,
        product,
        generatedAt: new Date().toISOString(),
      },
    };
  } catch {
    return {
      props: {
        productId,
        product: null,
        generatedAt: new Date().toISOString(),
        errorMessage: "Gagal memuat detail produk di server.",
      },
    };
  }
};

export default SSRProductDetailPage;
