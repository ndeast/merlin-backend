/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: [".ts"],
  rootDir: 'src',
  "moduleDirectories": ["<rootDir>/../", "node_modules"],
  moduleNameMapper: {
    // 'absolute-path': 'relative-path'
    '../lastfm.js': '<rootDir>/lastfm.ts',
    '../index.js': '<rootDir>/index.ts',
    './lastfm.js': '<rootDir>/lastfm.ts'
    
  },
  globals: {
    "ts-jest": {
      useESM: true
    }
  }
};