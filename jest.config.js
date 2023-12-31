module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["@testing-library/react"],
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
    "<rootDir>/src/setupTests.ts",
  ],
  moduleNameMapper: {
    "\\.(css|less|jpg)$": "identity-obj-proxy",
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/src/reportWebVitals.ts",

    "^.*\\index\\.ts[x]?$",
  ],
};
