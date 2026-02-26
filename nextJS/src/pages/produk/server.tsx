import TampilanProduk from "@/views/product";
import { GetServerSideProps } from "next";
import { ProductType } from "../types/Product.type";

const HalamanProdukServer = (props: { products: ProductType[] }) => {
  return (
    <div>
      <h1>Halaman Produk Server</h1>
      <TampilanProduk products={props.products} />
    </div>
  )
}

export default HalamanProdukServer;

export const getServerSideProps: GetServerSideProps<{ products: ProductType[] }> = async (
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
