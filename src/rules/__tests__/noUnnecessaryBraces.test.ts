import {dedent} from './dedent'
import {noUnnecessaryBraces} from '../noUnnecessaryBraces'
import {RuleTester} from '@typescript-eslint/rule-tester'

const validSingleLineWithoutBraces = [{
  code: 'if (x) return {}',
  name: 'if return object',
}, {
  code: 'if (x) foo()',
  name: 'if call',
}, {
  code: 'if (x) return',
  name: 'if return',
}, {
  code: 'for (;;) return',
  name: 'for return',
}, {
  code: 'for (;;) break',
  name: 'for break',
}, {
  code: 'while (x) return',
  name: 'while return',
}, {
  code: 'while (x) break',
  name: 'while break',
}, {
  code: 'do return; while (x)',
  name: 'do-while return',
}, {
  code: 'do break; while (x)',
  name: 'do-while break',
}] as const

const validMultiLineWithBraces = [{
  code: dedent`
    if (x) {
      return {
        foo: 1
      }
    }
  `,
  name: 'if return object multiline',
}, {
  code: dedent`
    if (x) {
      console.log(
        'hello'
      )
    }
  `,
  name: 'if call multiline args',
}, {
  code: dedent`
    for (;;) {
      return {
        foo: 1
      }
    }
  `,
  name: 'for return object multiline',
}, {
  code: dedent`
    while (x) {
      console.log(
        'hello'
      )
    }
  `,
  name: 'while call multiline args',
}, {
  code: dedent`
    do {
      return {
        foo: 1
      }
    } while (x)
  `,
  name: 'do-while return object multiline',
}] as const

const validMultiStatement = [{
  code: dedent`
    if (x) {
      foo()
      bar()
    }
  `,
  name: 'if multiple statements',
}, {
  code: dedent`
    for (;;) {
      foo()
      bar()
    }
  `,
  name: 'for multiple statements',
}, {
  code: dedent`
    while (x) {
      foo()
      bar()
    }
  `,
  name: 'while multiple statements',
}, {
  code: dedent`
    do {
      foo()
      bar()
    } while (x)
  `,
  name: 'do-while multiple statements',
}] as const

const validEmptyBlock = [{
  code: 'if (x) {}',
  name: 'if empty block',
}, {
  code: 'for (;;) {}',
  name: 'for empty block',
}, {
  code: 'while (x) {}',
  name: 'while empty block',
}, {
  code: 'do {} while (x)',
  name: 'do-while empty block',
}] as const

const validElseIf = [{
  code: 'if (x) {} else if (y) {}',
  name: 'if-else-if empty',
}, {
  code: 'if (x) {} else if (y) {} else {}',
  name: 'if-else-if-else empty',
}] as const

const invalidSingleLineWithBraces = [{
  code: 'if (x) { return {} }',
  errors: [{messageId: 'unnecessaryBraces'}],
  name: 'if return object with braces',
  output: 'if (x)\n  return {}',
}, {
  code: dedent`
    if (x) {
      return {}
    }
  `,
  errors: [{messageId: 'unnecessaryBraces'}],
  name: 'if return object multiline with braces',
  output: 'if (x)\n  return {}',
}, {
  code: dedent`
    if (x) {
      foo()
    }
  `,
  errors: [{messageId: 'unnecessaryBraces'}],
  name: 'if single call multiline with braces',
  output: 'if (x)\n  foo()',
}, {
  code: 'for (;;) { return }',
  errors: [{messageId: 'unnecessaryBraces'}],
  name: 'for return with braces',
  output: 'for (;;)\n  return',
}, {
  code: dedent`
    for (;;) {
      break
    }
  `,
  errors: [{messageId: 'unnecessaryBraces'}],
  name: 'for break multiline with braces',
  output: 'for (;;)\n  break',
}, {
  code: 'while (x) { break }',
  errors: [{messageId: 'unnecessaryBraces'}],
  name: 'while break with braces',
  output: 'while (x)\n  break',
}, {
  code: dedent`
    while (x) {
      return
    }
  `,
  errors: [{messageId: 'unnecessaryBraces'}],
  name: 'while return multiline with braces',
  output: 'while (x)\n  return',
}, {
  code: 'do { return; } while (x)',
  errors: [{messageId: 'unnecessaryBraces'}],
  name: 'do-while return with braces',
  output: 'do\n  return; while (x)',
}, {
  code: dedent`
    do {
      break;
    } while (x)
  `,
  errors: [{messageId: 'unnecessaryBraces'}],
  name: 'do-while break multiline with braces',
  output: 'do\n  break; while (x)',
}] as const

const invalidMultiLineWithoutBraces = [{
  code: dedent`
    if (x) console.log(
      'hello'
    )
  `,
  errors: [{messageId: 'missingBraces'}],
  name: 'if call multiline missing braces',
  output: dedent`
    if (x) {
      console.log(
        'hello'
      )
    }
  `,
}, {
  code: dedent`
    for (;;) console.log(
      'hello'
    )
  `,
  errors: [{messageId: 'missingBraces'}],
  name: 'for call multiline missing braces',
  output: dedent`
    for (;;) {
      console.log(
        'hello'
      )
    }
  `,
}, {
  code: dedent`
    while (x) console.log(
      'hello'
    )
  `,
  errors: [{messageId: 'missingBraces'}],
  name: 'while call multiline missing braces',
  output: dedent`
    while (x) {
      console.log(
        'hello'
      )
    }
  `,
}, {
  code: dedent`
    do console.log(
      'hello'
    ); while (x)
  `,
  errors: [{messageId: 'missingBraces'}],
  name: 'do-while call multiline missing braces',
  output: dedent`
    do {
      console.log(
        'hello'
      );
    } while (x)
  `,
}, {
  code: dedent`
    if (x) return {
      foo: 1,
      bar: 2
    }
  `,
  errors: [{messageId: 'missingBraces'}],
  name: 'if return object multiline missing braces',
  output: dedent`
    if (x) {
      return {
        foo: 1,
        bar: 2
      }
    }
  `,
}, {
  code: dedent`
    if (x) foo(
        a,
        b,
        c
      )
  `,
  errors: [{messageId: 'missingBraces'}],
  name: 'if call with many args missing braces',
  output: dedent`
    if (x) {
      foo(
        a,
        b,
        c
      )
    }
  `,
}] as const

const ruleTester = new RuleTester()
ruleTester.run('no-unnecessary-braces', noUnnecessaryBraces, {
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
