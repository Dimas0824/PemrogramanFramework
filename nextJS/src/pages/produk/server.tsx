import TampilanProduk from "@/views/product";
import { GetServerSideProps } from "next";
import { ProductType } from "../../types/Product.type";
import { retrieveProducts } from "@/utils/db/servicefirebase";

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
    return {
      props: {
        products: (await retrieveProducts("products")) as ProductType[],
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
