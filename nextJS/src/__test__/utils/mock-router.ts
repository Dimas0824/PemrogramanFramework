type MockRouterOverrides = {
  pathname?: string;
  asPath?: string;
  query?: Record<string, unknown>;
  isReady?: boolean;
  events?: {
    on: jest.Mock;
    off: jest.Mock;
    emit?: jest.Mock;
  };
  push?: jest.Mock;
  replace?: jest.Mock;
  back?: jest.Mock;
  prefetch?: jest.Mock;
};

export const mockUseRouter = jest.fn();

export const createMockRouter = (overrides: MockRouterOverrides = {}) => ({
  pathname: "/",
  asPath: "/",
  query: {},
  isReady: true,
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  ...overrides,
});

export const setMockRouter = (overrides: MockRouterOverrides = {}) => {
  const router = createMockRouter(overrides);
  mockUseRouter.mockReturnValue(router);
  return router;
};
