import type {CategorizedReExport} from './CategorizedReExport'

export type CategorizedNamedReExport = Extract<
  CategorizedReExport,
  {declaration: {type: 'ExportNamedDeclaration'}}
>
