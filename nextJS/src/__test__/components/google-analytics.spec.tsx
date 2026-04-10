import { render } from "@testing-library/react";

const routerEvents = {
  on: jest.fn(),
  off: jest.fn(),
};

jest.mock("next/router", () => ({
  useRouter: () => ({
    events: routerEvents,
  }),
}));

jest.mock("next/script", () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

describe("GoogleAnalytics", () => {
  const originalEnv = process.env.NEXT_PUBLIC_GA_ID;

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
