import { render, screen } from "@testing-library/react";
import NotFoundPage from "@/pages/404";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} src={src} {...props} />
  ),
}));

describe("404 Page", () => {
  it("renders the error information and back link", () => {
    render(<NotFoundPage />);

    expect(screen.getByText("Halaman Tidak Ditemukan")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Kembali ke Home" }).getAttribute("href")).toBe("/");
  });
});
