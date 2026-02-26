import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ProductView, { ProductType } from "@/views/product";

type ApiProductsResponse = {
  status: boolean;
  status_code: number;
  message?: string;
  data: ProductType[];
};

type ServerProdukProps = {
  products: ProductType[];
  errorMessage?: string;
};

export const getServerSideProps: GetServerSideProps<ServerProdukProps> = async (context) => {
  const host = context.req.headers.host;
  const forwardedProto = context.req.headers["x-forwarded-proto"];
  const protocol =
    typeof forwardedProto === "string"
      ? forwardedProto
      : Array.isArray(forwardedProto)
      ? forwardedProto[0]
      : "http";

  if (!host) {
    return {
      props: {
        products: [],
        errorMessage: "Host request tidak ditemukan.",
      },
    };
  }

  try {
    const response = await fetch(`${protocol}://${host}/api/produk`);
    if (!response.ok) {
      throw new Error(`Request gagal (${response.status})`);
    }

    const payload = (await response.json()) as ApiProductsResponse;
    if (!payload.status) {
      throw new Error(payload.message ?? "Gagal memuat data produk dari API.");
    }

    return {
      props: {
        products: payload.data ?? [],
      },
    };
  } catch (error) {
    console.error("Error getServerSideProps /produk/server:", error);
    return {
      props: {
        products: [],
        errorMessage: "Gagal memuat data produk dari server.",
      },
    };
  }
};

const ProdukServerPage = ({
  products,
  errorMessage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <h1 style={{ margin: "16px 5% 0", color: "var(--foreground)" }}>Halaman Produk Server</h1>
      <ProductView products={products} isLoading={false} errorMessage={errorMessage} />
    </>
  );
};

export default ProdukServerPage;
