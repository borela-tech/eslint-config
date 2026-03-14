import type {TSESTree} from '@typescript-eslint/utils'

export function getInlineTypeName(
  usedNames: Set<string>,
  _existingInterfaces: TSESTree.TSInterfaceDeclaration[],
): string {
  const baseName = 'InlineType'

  if (!usedNames.has(baseName)) {
    usedNames.add(baseName)
    return baseName
  }

  let counter = 2
  while (usedNames.has(`${baseName}${counter}`)) {
    counter++
  }

  const name = `${baseName}${counter}`
  usedNames.add(name)
  return name
}
