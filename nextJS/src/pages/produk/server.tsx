import TampilanProduk, { ProductType } from "@/views/product";
import { GetServerSideProps } from "next";

type HalamanProdukServerProps = {
  products: ProductType[];
};

const HalamanProdukServer = ({ products }: HalamanProdukServerProps) => {
  return (
    <div>
      <h1>Halaman Produk Server</h1>
      <TampilanProduk products={products} />
    </div>
  )
}

export default HalamanProdukServer;

export const getServerSideProps: GetServerSideProps<HalamanProdukServerProps> = async (
) => {
  try {
    const res = await fetch("http://localhost:3000/api/produk");
    const response = await res.json();
    return {
      props: {
        products: response.data || [],
      },
    };
  } catch {
    return {
      props: {
        products: [],
      },
    }
  }
};
