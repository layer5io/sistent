/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  // Transform ESM modules like react-markdown
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },

  transformIgnorePatterns: [
    '/node_modules/(?!(react-markdown|remark-gfm|rehype-raw)/)', // allow ESM modules
  ],

  testMatch: [
    '**/__testing__/**/*.test.(ts|tsx|js|jsx)',
    '**/?(*.)+(spec|test).(ts|tsx|js|jsx)'
  ],

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // Remove deprecated globals config
  globals: {},

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
