import type {ImportSpecifier} from 'estree'
import {getSpecifierName} from './getSpecifierName'

export function areSpecifiersSorted(specifiers: ImportSpecifier[]): boolean {
  const names = specifiers.map(s => getSpecifierName(s))
  const sorted = [...names].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  )
  return names.every((name, i) => name === sorted[i])
}
