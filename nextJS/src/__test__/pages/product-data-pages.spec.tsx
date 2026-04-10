import { render, screen } from "@testing-library/react";
import ProductStaticPage, { getStaticProps } from "../../pages/produk/static";
import ProductServerPage, { getServerSideProps } from "../../pages/produk/server";
import { retrieveProducts } from "../../utils/db/servicefirebase";

jest.mock("../../utils/db/servicefirebase", () => ({
  retrieveProducts: jest.fn(),
}));

jest.mock("../../views/product", () => ({
  __esModule: true,
  default: ({ products }: { products: Array<{ name: string }> }) => (
    <div>Jumlah produk: {products.length}</div>
  ),
}));

describe("Product Data Pages", () => {
  it("renders static product page", () => {
    render(<ProductStaticPage products={[{ id: "1", name: "Produk A", category: "Umum", price: 1000, image: "" }]} />);

    expect(screen.getByText("Halaman Produk Static")).toBeTruthy();
    expect(screen.getByText("Jumlah produk: 1")).toBeTruthy();
  });

  it("renders server product page", () => {
    render(<ProductServerPage products={[{ id: "1", name: "Produk B", category: "Umum", price: 2000, image: "" }]} />);

    expect(screen.getByText("Halaman Produk Server")).toBeTruthy();
    expect(screen.getByText("Jumlah produk: 1")).toBeTruthy();
  });

  it("returns product props from getStaticProps", async () => {
    (retrieveProducts as jest.Mock).mockResolvedValue([
      { id: "1", name: "Produk A", category: "Umum", price: 1000, image: "" },
    ]);

    const result = await getStaticProps();

    expect(result).toMatchObject({
      props: {
        products: expect.arrayContaining([
          expect.objectContaining({ name: "Produk A" }),
        ]),
      },
    });
  });

  it("returns product props from getServerSideProps", async () => {
    (retrieveProducts as jest.Mock).mockResolvedValue([
      { id: "1", name: "Produk B", category: "Umum", price: 2000, image: "" },
    ]);

    const result = await getServerSideProps({} as never);

    expect(result).toMatchObject({
      props: {
        products: expect.arrayContaining([
          expect.objectContaining({ name: "Produk B" }),
        ]),
      },
    });
  });
});
