export interface Braces {
  closingBrace: {
    loc: {
      end: {column: number, line: number}
      start: {column: number, line: number}
    }
    range: [number, number]
    value: string
  }
  openingBrace: {
    loc: {
      end: {column: number, line: number}
      start: {column: number, line: number}
    }
    range: [number, number]
    value: string
  }
}
