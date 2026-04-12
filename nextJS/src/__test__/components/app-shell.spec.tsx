import { render, screen } from "@testing-library/react";
import AppShell from "@/components/layouts/AppShell";
import { mockUseRouter, setMockRouter } from "../utils/mock-router";

jest.mock("next/router", () => ({
  useRouter: () => mockUseRouter(),
}));

jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: null }),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("next/dist/client/script", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("AppShell", () => {
  it("shows navbar on regular routes", () => {
    setMockRouter({ pathname: "/" });

    render(
      <AppShell>
        <div>Home Content</div>
      </AppShell>,
    );

    expect(screen.getByRole("button", { name: "Sign In" })).toBeTruthy();
    expect(screen.getByText("Home Content")).toBeTruthy();
  });

  it("hides navbar on auth routes", () => {
    setMockRouter({ pathname: "/auth/login" });

    render(
      <AppShell>
        <div>Login Content</div>
      </AppShell>,
    );

    expect(screen.queryByRole("button", { name: "Sign In" })).toBeNull();
    expect(screen.getByText("Login Content")).toBeTruthy();
  });
});
