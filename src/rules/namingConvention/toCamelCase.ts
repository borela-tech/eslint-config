import {isSeparator} from './isSeparator'
import {isWordBoundary} from './isWordBoundary'
import {wordsToCamelCase} from './wordsToCamelCase'

export function toCamelCase(name: string): string {
  const words: string[] = []
  let currentWord = ''

  for (let i = 0; i < name.length; i++) {
    const char = name[i]
    const prevChar = i > 0 ? name[i - 1] : ''
    const nextChar = i < name.length - 1 ? name[i + 1] : ''

    if (isSeparator(char)) {
      if (currentWord) {
        words.push(currentWord.toLowerCase())
        currentWord = ''
      }
      continue
    }

    if (isWordBoundary(char, currentWord, prevChar, nextChar)) {
      words.push(currentWord.toLowerCase())
      currentWord = char
      continue
    }

    currentWord += char
  }

  if (currentWord)
    words.push(currentWord.toLowerCase())

  return wordsToCamelCase(words)
}
