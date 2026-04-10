jest.mock("../../views/auth/LoginPage", () => ({
  __esModule: true,
  default: function MockLoginPage() {
    return null;
  },
}));

jest.mock("../../pages/produk", () => ({
  __esModule: true,
  default: function MockProdukPage() {
    return null;
  },
}));

describe("Page alias exports", () => {
  it("maps login page to auth login view", () => {
    const LoginPage = require("../../pages/login").default;
    const LoginView = require("../../views/auth/LoginPage").default;

    expect(LoginPage).toBe(LoginView);
  });

  it("maps auth login page to auth login view", () => {
    const AuthLoginPage = require("../../pages/auth/login").default;
    const LoginView = require("../../views/auth/LoginPage").default;

    expect(AuthLoginPage).toBe(LoginView);
  });

  it("maps products page to produk page", () => {
    const ProductsPage = require("../../pages/products").default;
    const ProdukPage = require("../../pages/produk").default;

    expect(ProductsPage).toBe(ProdukPage);
  });
});
