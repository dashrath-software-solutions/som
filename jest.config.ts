import type { Config } from '@jest/types'
import * as path from 'path'

// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    testPathIgnorePatterns: ['node_modules'],
    verbose: true,
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    testEnvironment: 'node',
    testMatch: [path.resolve(__dirname, 'test/**/*.test.ts')],
    preset: 'ts-jest',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    setupFilesAfterEnv: [path.resolve(__dirname, 'utils', 'test-utils', 'singleton.ts')],
    moduleNameMapper: {},
    setupFiles: [path.resolve(__dirname, 'utils', 'test-utils', 'bootstrap.ts')],
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
      'ts-jest': {
        useESM: true,
      },
    },
    collectCoverage: true,
    coverageThreshold: {
      global: {
        lines: 90,
      },
    },
  }
}
