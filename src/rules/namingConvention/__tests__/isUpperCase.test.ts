import {isUpperCase} from '../isUpperCase'

describe('isUpperCase', () => {
  it('should return true for valid UPPER_CASE', () => {
    expect(isUpperCase('MAX_RETRY')).toBe(true)
    expect(isUpperCase('API_KEY')).toBe(true)
    expect(isUpperCase('MAX_COUNT')).toBe(true)
    expect(isUpperCase('DEFAULT_TIMEOUT')).toBe(true)
    expect(isUpperCase('A')).toBe(true)
  })

  it('should return true for UPPER_CASE with numbers', () => {
    expect(isUpperCase('MAX_RETRY_3')).toBe(true)
    expect(isUpperCase('API_V2_KEY')).toBe(true)
  })

  it('should return false for camelCase', () => {
    expect(isUpperCase('maxRetry')).toBe(false)
    expect(isUpperCase('myVariable')).toBe(false)
  })

  it('should return false for PascalCase', () => {
    expect(isUpperCase('MaxRetry')).toBe(false)
    expect(isUpperCase('MyVariable')).toBe(false)
  })

  it('should return false for snake_case (lowercase)', () => {
    expect(isUpperCase('max_retry')).toBe(false)
    expect(isUpperCase('my_variable')).toBe(false)
  })

  it('should handle edge cases', () => {
    expect(isUpperCase('')).toBe(false)
    expect(isUpperCase('_MAX_RETRY')).toBe(false)
    expect(isUpperCase('123')).toBe(false)
  })
})
