import typescript from 'typescript-eslint'
import {braceStyleControlStatements} from '../braceStyleControlStatements'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = braceStyleControlStatements as unknown as Rule.RuleModule
const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

const ifValid = [
  'if (foo)\n  return',
]

const ifInvalid = [
  {
    code: 'if (foo) return',
    errors: [{messageId: 'singleLine'}],
  },
  {
    code: 'if (foo) { return }',
    errors: [{messageId: 'singleLine'}],
  },
]

const elseValid = [
  'if (foo) {\n  bar()\n}\n  else {\n  }',
  'if (foo) {\n  bar()\n}\n  else\n    baz()',
]

const elseInvalid = [
  {
    code: 'if (foo) {\n  bar()\n}\n  else { bar() }',
    errors: [{messageId: 'singleLine'}],
  },
  {
    code: 'if (foo) {\n  bar()\n}\n  else bar()',
    errors: [{messageId: 'singleLine'}],
  },
]

const elseIfValid = [
  'if (foo) {\n  bar()\n}\n  else if (bar) {\n  }',
  'if (foo) {\n  bar()\n}\n  else if (bar) {\n    baz()\n  }',
  'if (foo) {\n  bar()\n}\n  else if (bar) {\n  }\n  else {\n  }',
]

const elseIfInvalid = [
  {
    code: 'if (foo) {\n  bar()\n}\n  else if (bar) { baz() }',
    errors: [{messageId: 'singleLine'}],
  },
  {
    code: 'if (foo) {\n  bar()\n}\n  else if (bar) {\n  }\n  else { qux() }',
    errors: [{messageId: 'singleLine'}],
  },
]

const forValid = [
  'for (;;)\n  return',
]

const forInvalid = [
  {
    code: 'for (;;) return',
    errors: [{messageId: 'singleLine'}],
  },
]

const whileValid = [
  'while (foo)\n  return',
]

const whileInvalid = [
  {
    code: 'while (foo) return',
    errors: [{messageId: 'singleLine'}],
  },
]

const doWhileValid = [
  'do\n  return\nwhile (foo)',
]

const doWhileInvalid = [
  {
    code: 'do { return } while (foo)',
    errors: [{messageId: 'singleLine'}],
  },
]

ruleTester.run('brace-style-control-statements', rule, {
  valid: [
    ...ifValid,
    ...elseValid,
    ...elseIfValid,
    ...forValid,
    ...whileValid,
    ...doWhileValid,
  ].map(code => ({code})),
  invalid: [
    ...ifInvalid,
    ...elseInvalid,
    ...elseIfInvalid,
    ...forInvalid,
    ...whileInvalid,
    ...doWhileInvalid,
  ],
})
