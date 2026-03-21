import type {ReExportDeclaration} from '@lib/ReExportDeclaration'

export function isMultilineReExport(declaration: ReExportDeclaration) {
  const {end, start} = declaration.loc ?? {}
  return start?.line !== end?.line
}
