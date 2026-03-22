export function isUpperCase(name: string): boolean {
  return /^[A-Z][\dA-Z_]*$/.test(name)
}
