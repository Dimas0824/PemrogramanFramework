import { render, screen } from "@testing-library/react";
import ProductRenderingNav from "@/components/rendering/ProductRenderingNav";
import { mockUseRouter, setMockRouter } from "../utils/mock-router";

jest.mock("next/router", () => ({
  useRouter: () => mockUseRouter(),
}));

describe("ProductRenderingNav", () => {
  beforeEach(() => {
    setMockRouter({
      pathname: "/rendering/produk/ssg",
      asPath: "/rendering/produk/ssg",
    });
  });

  it("renders product rendering links", () => {
    render(<ProductRenderingNav />);

    expect(screen.getByRole("link", { name: "Produk CSR" }).getAttribute("href")).toBe("/rendering/produk/csr");
    expect(screen.getByRole("link", { name: "Produk SSR" }).getAttribute("href")).toBe("/rendering/produk/ssr");
    expect(screen.getByRole("link", { name: "Produk SSG" }).getAttribute("href")).toBe("/rendering/produk/ssg");
  });
});
