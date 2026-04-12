import { render, screen } from "@testing-library/react";
import RenderingNav from "@/components/rendering/RenderingNav";
import { mockUseRouter, setMockRouter } from "../utils/mock-router";

jest.mock("next/router", () => ({
  useRouter: () => mockUseRouter(),
}));

describe("RenderingNav", () => {
  beforeEach(() => {
    setMockRouter({
      pathname: "/rendering/csr",
      asPath: "/rendering/csr",
    });
  });

  it("renders navigation links", () => {
    render(<RenderingNav />);

    const csrLink = screen.getByRole("link", { name: "CSR" });
    const ssrLink = screen.getByRole("link", { name: "SSR" });
    const ssgLink = screen.getByRole("link", { name: "SSG" });

    expect(csrLink.getAttribute("href")).toBe("/rendering/csr");
    expect(ssrLink.getAttribute("href")).toBe("/rendering/ssr");
    expect(ssgLink.getAttribute("href")).toBe("/rendering/ssg");
  });
});
