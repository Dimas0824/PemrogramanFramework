import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  testEnvironment: "jsdom",
  coverageProvider: "v8",
  modulePaths: ["<rootDir>/src/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.spec.{ts,tsx}",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/__test__/**",
    "!src/pages/api/**",
    "!src/views/**",
    "!src/types/**",
  ],
};

export default createJestConfig(config);