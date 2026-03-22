export function isWordBoundary(
  char: string,
  currentWord: string,
  prevChar: string,
  nextChar: string,
): boolean {
  if (!currentWord)
    return false

  const isUpper = /[A-Z]/.test(char)
  const prevIsUpper = /[A-Z]/.test(prevChar)
  const nextIsLower = /[a-z]/.test(nextChar)

  // Split at uppercase letters
  // Handle acronyms: XMLHttpRequest -> XML, Http, Request
  if (isUpper) {
    const isStartOfNewWord = !prevIsUpper || (prevIsUpper && nextIsLower)
    return isStartOfNewWord
  }

  return false
}
