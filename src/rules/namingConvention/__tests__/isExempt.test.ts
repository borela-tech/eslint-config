import {isExempt} from '../isExempt'

describe('isExempt', () => {
  it('should return true for names starting with underscore', () => {
    expect(isExempt('_unused')).toBe(true)
    expect(isExempt('_myVar')).toBe(true)
    expect(isExempt('_')).toBe(true)
    expect(isExempt('_unusedFunction')).toBe(true)
  })

  it('should return false for names not starting with underscore', () => {
    expect(isExempt('myVariable')).toBe(false)
    expect(isExempt('MaxRetry')).toBe(false)
    expect(isExempt('MAX_RETRY')).toBe(false)
    expect(isExempt('my_variable')).toBe(false)
  })

  it('should return false for empty string', () => {
    expect(isExempt('')).toBe(false)
  })

  it('should return false for underscore in middle', () => {
    expect(isExempt('my_var')).toBe(false)
    expect(isExempt('my_var_')).toBe(false)
  })
})
