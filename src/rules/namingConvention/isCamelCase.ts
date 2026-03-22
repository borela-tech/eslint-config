export function isCamelCase(name: string): boolean {
  if (!/^[a-z]/.test(name))
    return false
  return /^[a-z][\dA-Za-z]*$/.test(name)
}
