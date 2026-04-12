import { render, screen } from "@testing-library/react";
import BlogPostPage from "../../pages/blog/[slug]";
import CategoryPage from "../../pages/category/[...slug]";
import ShopPage from "../../pages/shop/[[...slug]]";
import { mockUseRouter, setMockRouter } from "../utils/mock-router";

jest.mock("next/router", () => ({
  useRouter: () => mockUseRouter(),
}));

describe("Dynamic Route Pages", () => {
  it("renders blog post slug when router is ready", () => {
    setMockRouter({
      isReady: true,
      query: {
        slug: "belajar-nextjs",
      },
    });

    render(<BlogPostPage />);

    expect(screen.getByText("Postingan: belajar-nextjs")).toBeTruthy();
  });

  it("renders loading state when blog router is not ready", () => {
    setMockRouter({
      isReady: false,
      query: {},
    });

    render(<BlogPostPage />);

    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  it("renders category slug list", () => {
    setMockRouter({
      query: {
        slug: ["teknologi", "frontend"],
      },
    });

    render(<CategoryPage />);

    expect(screen.getByText("Category Catch-all Route")).toBeTruthy();
    expect(screen.getByText("teknologi")).toBeTruthy();
    expect(screen.getByText("frontend")).toBeTruthy();
  });

  it("renders shop information from slug", () => {
    setMockRouter({
      query: {
        slug: ["sepatu", "running"],
      },
    });

    render(<ShopPage />);

    expect(screen.getByText("Halaman Toko")).toBeTruthy();
    expect(screen.getByText("Toko: sepatu-running")).toBeTruthy();
    expect(screen.getByText("Kategori: sepatu")).toBeTruthy();
  });
});
