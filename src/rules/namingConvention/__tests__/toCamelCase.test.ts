import {toCamelCase} from '../toCamelCase'

describe('toCamelCase', () => {
  it('should convert snake_case to camelCase', () => {
    expect(toCamelCase('max_retry')).toBe('maxRetry')
    expect(toCamelCase('my_variable_name')).toBe('myVariableName')
  })

  it('should handle PascalCase with acronyms', () => {
    expect(toCamelCase('XMLHttpRequest')).toBe('xmlHttpRequest')
    expect(toCamelCase('IOError')).toBe('ioError')
    expect(toCamelCase('myVariable')).toBe('myVariable')
  })

  it('should pass through all-lowercase strings', () => {
    expect(toCamelCase('maxretry')).toBe('maxretry')
    expect(toCamelCase('myfunction')).toBe('myfunction')
  })

  it('should convert kebab-case to camelCase', () => {
    expect(toCamelCase('my-variable')).toBe('myVariable')
    expect(toCamelCase('some-long-name')).toBe('someLongName')
  })

  it('should convert space-separated to camelCase', () => {
    expect(toCamelCase('my variable')).toBe('myVariable')
    expect(toCamelCase('Some Long Name')).toBe('someLongName')
  })

  it('should handle UPPER_CASE', () => {
    expect(toCamelCase('MAX_RETRY')).toBe('maxRetry')
    expect(toCamelCase('API_KEY')).toBe('apiKey')
  })

  it('should handle mixed separators', () => {
    expect(toCamelCase('api_v2_endpoint')).toBe('apiV2Endpoint')
    expect(toCamelCase('my-variable_name')).toBe('myVariableName')
  })

  it('should handle edge cases', () => {
    expect(toCamelCase('')).toBe('')
    expect(toCamelCase('a')).toBe('a')
    expect(toCamelCase('A')).toBe('a')
  })
})
