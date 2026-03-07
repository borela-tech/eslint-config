import type {ReExportDeclaration} from '@lib/ReExportDeclaration'

export function isMultiline(declaration: ReExportDeclaration) {
  const {start, end} = declaration.loc ?? {}
  return start?.line !== end?.line
}
