import { render, screen } from "@testing-library/react";
import App from "../../pages/_app";
import { mockUseRouter, setMockRouter } from "../utils/mock-router";

jest.mock("next/dynamic", () => () => function MockedDynamicComponent() {
  return <div>Google Analytics Mock</div>;
});

jest.mock("next-auth/react", () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useSession: () => ({ data: null }),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: () => mockUseRouter(),
}));

jest.mock("next/font/google", () => ({
  Roboto: () => ({
    className: "font-app",
  }),
}));

jest.mock("next/dist/client/script", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("_app Page", () => {
  it("renders the app wrapper and page component", () => {
    setMockRouter({ pathname: "/" });

    const MockPage = () => <div>Mocked Page Content</div>;

    render(
      <App
        Component={MockPage}
        pageProps={{}}
        router={{} as never}
      />,
    );

    expect(screen.getByText("Google Analytics Mock")).toBeTruthy();
    expect(screen.getByText("Mocked Page Content")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeTruthy();
  });
});
