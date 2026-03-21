import {braceStyleControlStatements} from '../braceStyleControlStatements'
import {RuleTester} from '@typescript-eslint/rule-tester'

const ifValid = [
  {
    code: 'if (foo)\n  return',
    name: 'single statement without braces',
  },
] as const

const elseValid = [
  {
    code: 'if (foo) {\n  bar()\n}\n  else {\n  }',
    name: 'if else with empty bodies',
  },
  {
    code: 'if (foo) {\n  bar()\n}\n  else\n    baz()',
    name: 'if else different styles',
  },
] as const

const elseIfValid = [
  {
    code: 'if (foo) {\n  bar()\n}\n  else if (bar) {\n  }',
    name: 'if else-if empty body',
  },
  {
    code: 'if (foo) {\n  bar()\n}\n  else if (bar) {\n    baz()\n  }',
    name: 'if else-if with body',
  },
  {
    code: 'if (foo) {\n  bar()\n}\n  else if (bar) {\n  }\n  else {\n  }',
    name: 'if else-if else all empty',
  },
] as const

const forValid = [
  {
    code: 'for (;;)\n  return',
    name: 'for single statement',
  },
] as const

const whileValid = [
  {
    code: 'while (foo)\n  return',
    name: 'while single statement',
  },
] as const

const doWhileValid = [
  {
    code: 'do \n  return\nwhile (foo)',
    name: 'do-while single statement',
  },
] as const

const ifInvalid = [
  {
    code: 'if (foo) return',
    errors: [{messageId: 'singleLine'}],
    name: 'if single line no braces',
    output: 'if (foo) {\n  return\n}',
  },
  {
    code: 'if (foo) { return }',
    errors: [{messageId: 'singleLine'}],
    name: 'if single line with braces',
    output: 'if (foo) \n{ return }',
  },
] as const

const elseInvalid = [
  {
    code: 'if (foo) {\n  bar()\n}\n  else { bar() }',
    errors: [{messageId: 'singleLine'}],
    name: 'else single line with braces',
    output: 'if (foo) {\n  bar()\n}\n  else \n{ bar() }',
  },
  {
    code: 'if (foo) {\n  bar()\n}\n  else bar()',
    errors: [{messageId: 'singleLine'}],
    name: 'else single line no braces',
    output: 'if (foo) {\n  bar()\n}\n  else {\n    bar()\n  }',
  },
] as const

const elseIfInvalid = [
  {
    code: 'if (foo) {\n  bar()\n}\n  else if (bar) { baz() }',
    errors: [{messageId: 'singleLine'}],
    name: 'else-if single line with braces',
    output: 'if (foo) {\n  bar()\n}\n  else if (bar) \n{ baz() }',
  },
  {
    code: 'if (foo) {\n  bar()\n}\n  else if (bar) {\n  }\n  else { qux() }',
    errors: [{messageId: 'singleLine'}],
    name: 'else-if-else with single line else',
    output: 'if (foo) {\n  bar()\n}\n  else if (bar) {\n  }\n  else \n{ qux() }',
  },
] as const

const forInvalid = [
  {
    code: 'for (;;) return',
    errors: [{messageId: 'singleLine'}],
    name: 'for single line no braces',
    output: 'for (;;) {\n  return\n}',
  },
] as const

const whileInvalid = [
  {
    code: 'while (foo) return',
    errors: [{messageId: 'singleLine'}],
    name: 'while single line no braces',
    output: 'while (foo) {\n  return\n}',
  },
] as const

const doWhileInvalid = [
  {
    code: 'do { return } while (foo)',
    errors: [{messageId: 'singleLine'}],
    name: 'do-while single line with braces',
    output: 'do \n{ return } while (foo)',
  },
] as const

const ruleTester = new RuleTester()
ruleTester.run('brace-style-control-statements', braceStyleControlStatements, {
  invalid: [
    ...ifInvalid,
    ...elseInvalid,
    ...elseIfInvalid,
    ...forInvalid,
    ...whileInvalid,
    ...doWhileInvalid,
  ],
  valid: [
    ...ifValid,
    ...elseValid,
    ...elseIfValid,
    ...forValid,
    ...whileValid,
    ...doWhileValid,
  ],
})
