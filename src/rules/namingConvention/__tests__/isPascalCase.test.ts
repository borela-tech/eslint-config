import {isPascalCase} from '../isPascalCase'

describe('isPascalCase', () => {
  it('should return true for valid PascalCase', () => {
    expect(isPascalCase('MyVariable')).toBe(true)
    expect(isPascalCase('MaxRetry')).toBe(true)
    expect(isPascalCase('UserData')).toBe(true)
    expect(isPascalCase('MyComponent')).toBe(true)
    expect(isPascalCase('A')).toBe(true)
    expect(isPascalCase('MyVariable2')).toBe(true)
  })

  it('should return false for camelCase', () => {
    expect(isPascalCase('myVariable')).toBe(false)
    expect(isPascalCase('maxRetry')).toBe(false)
    expect(isPascalCase('userData')).toBe(false)
  })

  it('should return false for snake_case', () => {
    expect(isPascalCase('my_variable')).toBe(false)
    expect(isPascalCase('Max_Retry')).toBe(false)
  })

  it('should return false for UPPER_CASE', () => {
    expect(isPascalCase('MAX_RETRY')).toBe(false)
    expect(isPascalCase('API_KEY')).toBe(false)
  })

  it('should return false for kebab-case', () => {
    expect(isPascalCase('My-Variable')).toBe(false)
  })

  it('should handle edge cases', () => {
    expect(isPascalCase('')).toBe(false)
    expect(isPascalCase('_MyVariable')).toBe(false)
  })
})
