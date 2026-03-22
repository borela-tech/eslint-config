import {isCamelCase} from '../isCamelCase'

describe('isCamelCase', () => {
  it('should return true for valid camelCase', () => {
    expect(isCamelCase('myVariable')).toBe(true)
    expect(isCamelCase('maxRetry')).toBe(true)
    expect(isCamelCase('userData')).toBe(true)
    expect(isCamelCase('handleClick')).toBe(true)
    expect(isCamelCase('a')).toBe(true)
    expect(isCamelCase('myVariable2')).toBe(true)
  })

  it('should return true for all-lowercase strings', () => {
    expect(isCamelCase('maxretry')).toBe(true)
    expect(isCamelCase('myfunction')).toBe(true)
    expect(isCamelCase('apiendpoint')).toBe(true)
  })

  it('should return false for PascalCase', () => {
    expect(isCamelCase('MyVariable')).toBe(false)
    expect(isCamelCase('MaxRetry')).toBe(false)
    expect(isCamelCase('UserData')).toBe(false)
  })

  it('should return false for snake_case', () => {
    expect(isCamelCase('my_variable')).toBe(false)
    expect(isCamelCase('max_retry')).toBe(false)
  })

  it('should return false for UPPER_CASE', () => {
    expect(isCamelCase('MAX_RETRY')).toBe(false)
    expect(isCamelCase('API_KEY')).toBe(false)
  })

  it('should return false for kebab-case', () => {
    expect(isCamelCase('my-variable')).toBe(false)
    expect(isCamelCase('max-retry')).toBe(false)
  })

  it('should return false for strings with spaces', () => {
    expect(isCamelCase('my variable')).toBe(false)
  })

  it('should handle edge cases', () => {
    expect(isCamelCase('')).toBe(false)
    expect(isCamelCase('_myVariable')).toBe(false)
  })
})
