export function compare(a: string, b: string): number {
  return a.localeCompare(b, 'en', {sensitivity: 'case'})
}
