import {isReactComponent} from '../isReactComponent'

describe('isReactComponent', () => {
  it('should return true for ReactElement', () => {
    expect(isReactComponent('ReactElement')).toBe(true)
    expect(isReactComponent('ReactElement<Props>')).toBe(true)
    expect(isReactComponent('React.ReactElement')).toBe(true)
  })

  it('should return true for JSX.Element', () => {
    expect(isReactComponent('JSX.Element')).toBe(true)
  })

  it('should return true for React.JSX.Element', () => {
    expect(isReactComponent('React.JSX.Element')).toBe(true)
  })

  it('should return true for ReactNode', () => {
    expect(isReactComponent('ReactNode')).toBe(true)
    expect(isReactComponent('React.ReactNode')).toBe(true)
  })

  it('should return false for non-React types', () => {
    expect(isReactComponent('void')).toBe(false)
    expect(isReactComponent('number')).toBe(false)
    expect(isReactComponent('string')).toBe(false)
    expect(isReactComponent('boolean')).toBe(false)
    expect(isReactComponent('Promise<void>')).toBe(false)
  })

  it('should return false for undefined', () => {
    expect(isReactComponent(undefined)).toBe(false)
  })

  it('should return false for empty string', () => {
    expect(isReactComponent('')).toBe(false)
  })

  it('should handle complex return types', () => {
    expect(isReactComponent('ReactElement | null')).toBe(true)
    expect(isReactComponent('ReactNode | undefined')).toBe(true)
  })
})
