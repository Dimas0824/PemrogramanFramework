import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  testEnvironment: "jsdom",
  coverageProvider: "v8",
  modulePaths: ["<rootDir>/src/"],
  maxWorkers: "50%",
  workerIdleMemoryLimit: "512MB",
  testTimeout: 15000,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/middleware.ts",
    "src/Middleware/**/*.{ts,tsx}",
    "src/data/**/*.{ts,tsx}",
    "src/lib/**/*.{ts,tsx}",
    "src/utils/swr/**/*.{ts,tsx}",
    "src/components/analytics/**/*.{ts,tsx}",
    "src/components/layouts/**/*.{ts,tsx}",
    "src/components/rendering/**/*.{ts,tsx}",
    "src/pages/_app.tsx",
    "src/pages/404.tsx",
    "src/pages/about.tsx",
    "src/pages/index.tsx",
    "src/pages/login.tsx",
    "src/pages/admin/index.tsx",
    "src/pages/auth/login/index.tsx",
    "src/pages/auth/register/index.tsx",
    "src/pages/products/index.tsx",
    "src/pages/produk/index.tsx",
    "src/pages/profile/index.tsx",
    "src/pages/profile/edit.tsx",
    "src/pages/rendering/csr.tsx",
    "src/pages/rendering/ssr.tsx",
    "src/pages/rendering/ssg.tsx",
    "src/pages/setting/app.tsx",
    "src/pages/user/index.tsx",
    "src/pages/user/password.tsx",
    "!src/**/*.d.ts",
    "!src/**/__test__/**",
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};

export default createJestConfig(config);