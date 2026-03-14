export function isParentImport(importPath: string) {
  return importPath.startsWith('../')
}
