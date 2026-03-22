export function isReactComponent(returnTypeText: string | undefined): boolean {
  if (!returnTypeText)
    return false

  const patterns = [
    'JSX.Element',
    'React.JSX.Element',
    'ReactElement',
    'ReactNode',
  ]

  return patterns.some(pattern => returnTypeText.includes(pattern))
}
