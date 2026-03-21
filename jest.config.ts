import type {Config} from 'jest'

const config: Config = {
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {useESM: true},
    ],
  },
}

export {config as default}
