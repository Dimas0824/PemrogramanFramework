import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";
import DetailProductRendering from "@/views/DetailProductRendering";
import { normalizeProduct, normalizeProducts, ProductType } from "@/types/Product.type";
import { retrieveDataByID, retrieveProducts } from "@/utils/db/servicefirebase";

type SSGProductDetailPageProps = {
  productId: string;
  product: ProductType;
  generatedAt: string;
};

const SSGProductDetailPage = ({
  productId,
  product,
  generatedAt,
}: SSGProductDetailPageProps) => {
  return (
    <>
      <Head>
        <title>SSG Detail Produk</title>
      </Head>
      <DetailProductRendering
        pageTitle="Detail Produk dengan SSG"
        pageDescription="Data produk dibuat sepenuhnya saat build time dengan getStaticPaths dan getStaticProps tanpa runtime regeneration."
        renderingLabel="SSG"
        productId={productId}
        product={product}
        generatedAt={generatedAt}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const products = normalizeProducts(await retrieveProducts("products"));

    return {
      paths: products.map((product) => ({
        params: { produk: product.id },
      })),
      fallback: "blocking",
    };
  } catch {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps<SSGProductDetailPageProps> = async ({
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
      return { notFound: true, revalidate: 60 };
    }

    return {
      props: {
        productId,
        product,
        generatedAt: new Date().toISOString(),
      },
      revalidate: 60,
    };
  } catch {
    return { notFound: true, revalidate: 60 };
  }
};

export default SSGProductDetailPage;
