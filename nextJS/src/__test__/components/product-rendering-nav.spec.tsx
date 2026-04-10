import { render, screen } from "@testing-library/react";
import ProductRenderingNav from "@/components/rendering/ProductRenderingNav";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "/rendering/produk/ssg",
      asPath: "/rendering/produk/ssg",
      query: {},
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      isReady: true,
    };
  },
}));

describe("ProductRenderingNav", () => {
  it("renders product rendering links", () => {
    render(<ProductRenderingNav />);

    expect(screen.getByRole("link", { name: "Produk CSR" }).getAttribute("href")).toBe("/rendering/produk/csr");
    expect(screen.getByRole("link", { name: "Produk SSR" }).getAttribute("href")).toBe("/rendering/produk/ssr");
    expect(screen.getByRole("link", { name: "Produk SSG" }).getAttribute("href")).toBe("/rendering/produk/ssg");
  });
});
