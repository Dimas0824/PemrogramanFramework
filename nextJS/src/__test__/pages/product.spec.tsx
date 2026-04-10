import { render, screen } from "@testing-library/react";
import TampilanProduk from "@/pages/produk";
import ProductView from "@/views/product";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/product",
      pathname: "",
      query: {},
      asPath: "",
      push: jest.fn(),
      event: {
        on: jest.fn(),
        off: jest.fn(),
      },
      isReady: true,
    };
  },
}));

describe("Product Page", () => {
  it("renders product page correctly", () => {
    const page = render(<TampilanProduk />);
    expect(screen.getByTestId("title").textContent).toBe("Product Page");
    expect(page).toMatchSnapshot();
  });

  it("shows empty state on product page", () => {
    render(<TampilanProduk />);
    expect(screen.getByText("Belum ada produk untuk ditampilkan.")).toBeTruthy();
  });

  it("renders product list in product view", () => {
    render(
      <ProductView
        products={[
          {
            id: "p1",
            name: "Sepatu Running",
            category: "Sport",
            price: 25000,
            image: "",
          },
        ]}
      />,
    );

    expect(screen.getByText("Sepatu Running")).toBeTruthy();
    expect(screen.getByText("Sport")).toBeTruthy();
    expect(screen.getByText("Rp 25.000")).toBeTruthy();
  });

  it("renders loading skeleton items", () => {
    const { container } = render(<ProductView products={[]} isLoading />);
    expect(container.querySelectorAll("div[aria-hidden='true']").length).toBe(6);
  });

  it("renders error message when request fails", () => {
    render(<ProductView products={[]} errorMessage="Gagal memuat produk." />);
    expect(screen.getByText("Gagal memuat produk.")).toBeTruthy();
  });
});