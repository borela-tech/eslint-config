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
  {code: 'if (x) return {}'},
  {code: 'if (x) foo()'},
  {code: 'if (x) return'},
  {code: 'for (;;) return'},
  {code: 'for (;;) break'},
  {code: 'while (x) return'},
  {code: 'while (x) break'},
  {code: 'do return; while (x)'},
  {code: 'do break; while (x)'},
]

const validMultiLineWithBraces = [
  {code: dedent`
    if (x) {
      return {
        foo: 1
      }
    }
  `},
  {code: dedent`
    if (x) {
      console.log(
        'hello'
      )
    }
  `},
  {code: dedent`
    for (;;) {
      return {
        foo: 1
      }
    }
  `},
  {code: dedent`
    while (x) {
      console.log(
        'hello'
      )
    }
  `},
  {code: dedent`
    do {
      return {
        foo: 1
      }
    } while (x)
  `},
]

const validMultiStatement = [
  {code: dedent`
    if (x) {
      foo()
      bar()
    }
  `},
  {code: dedent`
    for (;;) {
      foo()
      bar()
    }
  `},
  {code: dedent`
    while (x) {
      foo()
      bar()
    }
  `},
  {code: dedent`
    do {
      foo()
      bar()
    } while (x)
  `},
]

const validEmptyBlock = [
  {code: 'if (x) {}'},
  {code: 'for (;;) {}'},
  {code: 'while (x) {}'},
  {code: 'do {} while (x)'},
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
    ...validSingleLineWithoutBraces,
    ...validMultiLineWithBraces,
    ...validMultiStatement,
    ...validEmptyBlock,
    ...validElseIf,
  ],
})
