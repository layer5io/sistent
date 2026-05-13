module.exports = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  },
  // @rjsf/* and json-schema-typed publish ESM-only sources and must
  // pass through the @swc/jest transformer for the
  // RJSFFormWrapper / RJSFFormModal smoke tests to load.
  transformIgnorePatterns: [
    '/node_modules/(?!(@rjsf|@x0k|json-schema-typed|nanoid)/)'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/\\.claude/'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
