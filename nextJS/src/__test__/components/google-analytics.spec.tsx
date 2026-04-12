import { render } from "@testing-library/react";
import { mockUseRouter, setMockRouter } from "../utils/mock-router";

jest.mock("next/router", () => ({
  useRouter: () => mockUseRouter(),
}));

jest.mock("next/script", () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

describe("GoogleAnalytics", () => {
  const originalEnv = process.env.NEXT_PUBLIC_GA_ID;

  beforeEach(() => {
    setMockRouter();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_GA_ID = originalEnv;
    jest.clearAllMocks();
    jest.resetModules();
  });

  it("returns null when GA id is not configured", async () => {
    delete process.env.NEXT_PUBLIC_GA_ID;

    const GoogleAnalytics = (await import("../../components/analytics/GoogleAnalytics")).default;
    const { container } = render(<GoogleAnalytics />);

    expect(container.firstChild).toBeNull();
  });
});
