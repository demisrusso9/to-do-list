module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  collectCoverage: true,
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/tests/mocks/fileMock.ts',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/main.tsx",
  ],
  coverageReporters: ["lcov", "json"]
}