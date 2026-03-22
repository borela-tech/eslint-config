import {toPascalCase} from '../toPascalCase'

describe('toPascalCase', () => {
  it('should convert snake_case to PascalCase', () => {
    expect(toPascalCase('max_retry')).toBe('MaxRetry')
    expect(toPascalCase('my_variable_name')).toBe('MyVariableName')
  })

  it('should handle camelCase', () => {
    expect(toPascalCase('myVariable')).toBe('MyVariable')
    expect(toPascalCase('maxRetry')).toBe('MaxRetry')
  })

  it('should handle all-lowercase strings', () => {
    expect(toPascalCase('maxretry')).toBe('Maxretry')
    expect(toPascalCase('myfunction')).toBe('Myfunction')
  })

  it('should convert UPPER_CASE to PascalCase', () => {
    expect(toPascalCase('MAX_RETRY')).toBe('MaxRetry')
    expect(toPascalCase('API_KEY')).toBe('ApiKey')
  })

  it('should handle edge cases', () => {
    expect(toPascalCase('')).toBe('')
    expect(toPascalCase('a')).toBe('A')
    expect(toPascalCase('A')).toBe('A')
  })
})
