export function interpolate(
  strings: TemplateStringsArray,
  values: unknown[],
): string {
  let result = ''
  for (let i = 0; i < strings.length; i++) {
    result += strings[i]
    if (i < values.length) result += String(values[i])
  }
  return result
}
