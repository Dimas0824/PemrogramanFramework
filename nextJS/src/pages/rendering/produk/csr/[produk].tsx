import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProductRendering from "@/views/DetailProductRendering";
import { normalizeProduct, ProductType } from "@/types/Product.type";
import fetcher from "@/utils/swr/fetcher";

type ProductApiResponse = {
  status: boolean;
  status_code: number;
  data: ProductType | null;
};

const CSRProductDetailPage = () => {
  const router = useRouter();
  const productId = typeof router.query.produk === "string" ? router.query.produk : undefined;
  const shouldFetch = router.isReady && Boolean(productId);

  const { data, error, isLoading } = useSWR<ProductApiResponse>(
    shouldFetch ? `/api/produk/${productId}` : null,
    fetcher,
  );

  const product = data?.data ? normalizeProduct(data.data) : null;
  const errorMessage = error
    ? "Gagal memuat detail produk melalui CSR."
    : data && !data.status
      ? "Data produk tidak tersedia."
      : undefined;

  return (
    <>
      <Head>
        <title>CSR Detail Produk</title>
      </Head>
      <DetailProductRendering
        pageTitle="Detail Produk dengan CSR"
        pageDescription="Data produk diambil di browser setelah halaman dibuka menggunakan request ke API internal Next.js."
        renderingLabel="CSR"
        productId={productId}
        product={product}
        isLoading={!router.isReady || isLoading}
        errorMessage={errorMessage}
        generatedAt={data ? new Date().toISOString() : undefined}
      />
    </>
  );
};

export default CSRProductDetailPage;
