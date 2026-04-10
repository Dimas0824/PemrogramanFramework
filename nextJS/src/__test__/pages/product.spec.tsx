import { render, screen } from "@testing-library/react";
import TampilanProduk from "@/pages/products";

describe("Product Page", () => {
  it("renders product page correctly", () => {
    const page = render(<TampilanProduk />);
    expect(screen.getByTestId("title").textContent).toBe("Product Page");
    expect(page).toMatchSnapshot();
  });
});