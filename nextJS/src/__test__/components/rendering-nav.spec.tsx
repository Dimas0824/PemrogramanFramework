import { render, screen } from "@testing-library/react";
import RenderingNav from "@/components/rendering/RenderingNav";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "/rendering/csr",
      asPath: "/rendering/csr",
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

describe("RenderingNav", () => {
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
