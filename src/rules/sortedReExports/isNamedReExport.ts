import {CategorizedNamedReExport} from './CategorizedNamedReExport'
import type {CategorizedReExport} from './CategorizedReExport'

export function isNamedReExport(x: CategorizedReExport): x is CategorizedNamedReExport {
  return x.group !== 're-export-all'
}
