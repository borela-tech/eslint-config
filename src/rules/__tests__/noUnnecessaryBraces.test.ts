import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {noUnnecessaryBraces} from '../noUnnecessaryBraces'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = noUnnecessaryBraces as unknown as Rule.RuleModule
const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

const validSingleLineWithoutBraces = [
  'if (x) return {}',
  'if (x) foo()',
  'if (x) return',
  'for (;;) return',
  'for (;;) break',
  'while (x) return',
  'while (x) break',
  'do return; while (x)',
  'do break; while (x)',
]

const validMultiLineWithBraces = [
  dedent`
    if (x) {
      return {
        foo: 1
      }
    }
  `,
  dedent`
    if (x) {
      console.log(
        'hello'
      )
    }
  `,
  dedent`
    for (;;) {
      return {
        foo: 1
      }
    }
  `,
  dedent`
    while (x) {
      console.log(
        'hello'
      )
    }
  `,
  dedent`
    do {
      return {
        foo: 1
      }
    } while (x)
  `,
]

const validMultiStatement = [
  dedent`
    if (x) {
      foo()
      bar()
    }
  `,
  dedent`
    for (;;) {
      foo()
      bar()
    }
  `,
  dedent`
    while (x) {
      foo()
      bar()
    }
  `,
  dedent`
    do {
      foo()
      bar()
    } while (x)
  `,
]

const validEmptyBlock = [
  'if (x) {}',
  'for (;;) {}',
  'while (x) {}',
  'do {} while (x)',
]

const validElseIf = []

const invalidSingleLineWithBraces = [
  {
    code: 'if (x) { return {} }',
    errors: [{messageId: 'unnecessaryBraces'}],
    output: 'if (x)\n  return {}',
  },
  {
    code: dedent`
      if (x) {
        return {}
      }
    `,
    errors: [{messageId: 'unnecessaryBraces'}],
    output: 'if (x)\n  return {}',
  },
  {
    code: dedent`
      if (x) {
        foo()
      }
    `,
    errors: [{messageId: 'unnecessaryBraces'}],
    output: 'if (x)\n  foo()',
  },
  {
    code: 'for (;;) { return }',
    errors: [{messageId: 'unnecessaryBraces'}],
    output: 'for (;;)\n  return',
  },
  {
    code: dedent`
      for (;;) {
        break
      }
    `,
    errors: [{messageId: 'unnecessaryBraces'}],
    output: 'for (;;)\n  break',
  },
  {
    code: 'while (x) { break }',
    errors: [{messageId: 'unnecessaryBraces'}],
    output: 'while (x)\n  break',
  },
  {
    code: dedent`
      while (x) {
        return
      }
    `,
    errors: [{messageId: 'unnecessaryBraces'}],
    output: 'while (x)\n  return',
  },
  {
    code: 'do { return; } while (x)',
    errors: [{messageId: 'unnecessaryBraces'}],
    output: 'do\n  return; while (x)',
  },
  {
    code: dedent`
      do {
        break;
      } while (x)
    `,
    errors: [{messageId: 'unnecessaryBraces'}],
    output: 'do\n  break; while (x)',
  },
]

const invalidMultiLineWithoutBraces = [
  {
    code: dedent`
      if (x) console.log(
        'hello'
      )
    `,
    errors: [{messageId: 'missingBraces'}],
    output: dedent`
      if (x) {
        console.log(
          'hello'
        )
      }
    `,
  },
  {
    code: dedent`
      for (;;) console.log(
        'hello'
      )
    `,
    errors: [{messageId: 'missingBraces'}],
    output: dedent`
      for (;;) {
        console.log(
          'hello'
        )
      }
    `,
  },
  {
    code: dedent`
      while (x) console.log(
        'hello'
      )
    `,
    errors: [{messageId: 'missingBraces'}],
    output: dedent`
      while (x) {
        console.log(
          'hello'
        )
      }
    `,
  },
  {
    code: dedent`
      do console.log(
        'hello'
      ); while (x)
    `,
    errors: [{messageId: 'missingBraces'}],
    output: dedent`
      do {
        console.log(
          'hello'
        );
      } while (x)
    `,
  },
  {
    code: dedent`
      if (x) return {
        foo: 1,
        bar: 2
      }
    `,
    errors: [{messageId: 'missingBraces'}],
    output: dedent`
      if (x) {
        return {
          foo: 1,
          bar: 2
        }
      }
    `,
  },
  {
    code: dedent`
      if (x) foo(
          a,
          b,
          c
        )
    `,
    errors: [{messageId: 'missingBraces'}],
    output: dedent`
      if (x) {
        foo(
          a,
          b,
          c
        )
      }
    `,
  },
]

ruleTester.run('no-unnecessary-braces', rule, {
  invalid: [
    ...invalidSingleLineWithBraces,
    ...invalidMultiLineWithoutBraces,
  ],
  valid: [
    ...validSingleLineWithoutBraces.map(code => ({code})),
    ...validMultiLineWithBraces.map(code => ({code})),
    ...validMultiStatement.map(code => ({code})),
    ...validEmptyBlock.map(code => ({code})),
    ...validElseIf.map(code => ({code})),
  ],
})
