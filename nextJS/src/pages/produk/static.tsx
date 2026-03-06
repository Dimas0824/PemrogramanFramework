import TampilanProduk from "../../views/product";
import { ProductType } from "../../types/Product.type";
import { retrieveProducts } from "@/utils/db/servicefirebase";

const halamanProdukStatic = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <h1>Halaman Produk Static</h1>
      <TampilanProduk products={products} />
    </div>
  );
};
export default halamanProdukStatic;

export async function getStaticProps() {
  try {
    const products = (await retrieveProducts("products")) as ProductType[];
    return {
      props: {
        products,
      },
    };
  } catch {
    return {
      props: {
        products: [],
      },
    };
  }
}
