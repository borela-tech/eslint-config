import {stripExtension} from './stripExtension'

export function isExempt(filename: string): boolean {
  const name = stripExtension(filename)

  return (
    name === 'index'
    || name.endsWith('.test')
    || name.endsWith('.spec')
    || name.endsWith('.config')
  )
}
