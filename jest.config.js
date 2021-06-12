module.exports = {
  testPathIgnorePatterns: ["/node_modules"],
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)": "<rootDir>/node_modules/babel-jest"
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{tsx,ts}",
    "!src/**/*.spec.tsx",
  ],
  coverageReporters: ["lcov", "json"]
}
