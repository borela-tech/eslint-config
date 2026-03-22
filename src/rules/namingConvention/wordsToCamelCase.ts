import {capitalize} from './capitalize'

export function wordsToCamelCase(words: string[]): string {
  if (words.length === 0)
    return ''

  if (words.length === 1)
    return words[0].toLowerCase()

  const firstWord = words[0].toLowerCase()
  const restWords = words.slice(1).map(capitalize)

  return firstWord + restWords.join('')
}
