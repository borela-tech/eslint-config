import typescript from 'typescript-eslint'
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
  `if (x) {
    return {
      foo: 1
    }
  }`,
  `if (x) {
    console.log(
      'hello'
    )
  }`,
  `for (;;) {
    return {
      foo: 1
    }
  }`,
  `while (x) {
    console.log(
      'hello'
    )
  }`,
  `do {
    return {
      foo: 1
    }
  } while (x)`,
]

const validMultiStatement = [
  `if (x) {
    foo()
    bar()
  }`,
  `for (;;) {
    foo()
    bar()
  }`,
  `while (x) {
    foo()
    bar()
  }`,
  `do {
    foo()
    bar()
  } while (x)`,
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
    output: 'if (x) return {}',
  },
  {
    code: `if (x) {
      return {}
    }`,
    errors: [{messageId: 'unnecessaryBraces'}],
    output: `if (x) return {}`,
  },
  {
    code: `if (x) {
      foo()
    }`,
    errors: [{messageId: 'unnecessaryBraces'}],
    output: `if (x) foo()`,
  },
  {
    code: 'for (;;) { return }',
    errors: [{messageId: 'unnecessaryBraces'}],
    output: 'for (;;) return',
  },
  {
    code: `for (;;) {
      break
    }`,
    errors: [{messageId: 'unnecessaryBraces'}],
    output: `for (;;) break`,
  },
  {
    code: 'while (x) { break }',
    errors: [{messageId: 'unnecessaryBraces'}],
    output: 'while (x) break',
  },
  {
    code: `while (x) {
      return
    }`,
    errors: [{messageId: 'unnecessaryBraces'}],
    output: `while (x) return`,
  },
  {
    code: 'do { return; } while (x)',
    errors: [{messageId: 'unnecessaryBraces'}],
    output: 'do return; while (x)',
  },
  {
    code: `do {
      break;
    } while (x)`,
    errors: [{messageId: 'unnecessaryBraces'}],
    output: `do break; while (x)`,
  },
]

const invalidMultiLineWithoutBraces = [
  {
    code: `if (x) console.log(
      'hello'
    )`,
    errors: [{messageId: 'missingBraces'}],
    output: `if (x) {
  console.log(
    'hello'
  )
}`,
  },
  {
    code: `for (;;) console.log(
      'hello'
    )`,
    errors: [{messageId: 'missingBraces'}],
    output: `for (;;) {
  console.log(
    'hello'
  )
}`,
  },
  {
    code: `while (x) console.log(
      'hello'
    )`,
    errors: [{messageId: 'missingBraces'}],
    output: `while (x) {
  console.log(
    'hello'
  )
}`,
  },
  {
    code: `do console.log(
      'hello'
    ); while (x)`,
    errors: [{messageId: 'missingBraces'}],
    output: `do {
  console.log(
    'hello'
  );
} while (x)`,
  },
  {
    code: `if (x) return {
      foo: 1,
      bar: 2
    }`,
    errors: [{messageId: 'missingBraces'}],
    output: `if (x) {
  return {
    foo: 1,
    bar: 2
  }
}`,
  },
  {
    code: `if (x) foo(
        a,
        b,
        c
      )`,
    errors: [{messageId: 'missingBraces'}],
    output: `if (x) {
  foo(
    a,
    b,
    c
  )
}`,
  },
]

ruleTester.run('no-unnecessary-braces', rule, {
  valid: [
    ...validSingleLineWithoutBraces.map(code => ({code})),
    ...validMultiLineWithBraces.map(code => ({code})),
    ...validMultiStatement.map(code => ({code})),
    ...validEmptyBlock.map(code => ({code})),
    ...validElseIf.map(code => ({code})),
  ],
  invalid: [
    ...invalidSingleLineWithBraces,
    ...invalidMultiLineWithoutBraces,
  ],
})
