export function isPascalCase(name: string): boolean {
  if (!/^[A-Z]/.test(name))
    return false
  return /^[A-Z][\dA-Za-z]*$/.test(name)
}
