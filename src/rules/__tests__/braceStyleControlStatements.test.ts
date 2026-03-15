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
    output: 'if (foo) {\n  return\n}',
  },
  {
    code: 'if (foo) { return }',
    errors: [{messageId: 'singleLine'}],
    output: 'if (foo) \n{ return }',
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
    output: 'if (foo) {\n  bar()\n}\n  else \n{ bar() }',
  },
  {
    code: 'if (foo) {\n  bar()\n}\n  else bar()',
    errors: [{messageId: 'singleLine'}],
    output: 'if (foo) {\n  bar()\n}\n  else {\n    bar()\n  }',
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
    output: 'if (foo) {\n  bar()\n}\n  else if (bar) \n{ baz() }',
  },
  {
    code: 'if (foo) {\n  bar()\n}\n  else if (bar) {\n  }\n  else { qux() }',
    errors: [{messageId: 'singleLine'}],
    output: 'if (foo) {\n  bar()\n}\n  else if (bar) {\n  }\n  else \n{ qux() }',
  },
]

const forValid = [
  'for (;;)\n  return',
]

const forInvalid = [
  {
    code: 'for (;;) return',
    errors: [{messageId: 'singleLine'}],
    output: 'for (;;) {\n  return\n}',
  },
]

const whileValid = [
  'while (foo)\n  return',
]

const whileInvalid = [
  {
    code: 'while (foo) return',
    errors: [{messageId: 'singleLine'}],
    output: 'while (foo) {\n  return\n}',
  },
]

const doWhileValid = [
  'do\n  return\nwhile (foo)',
]

const doWhileInvalid = [
  {
    code: 'do { return } while (foo)',
    errors: [{messageId: 'singleLine'}],
    output: 'do \n{ return } while (foo)',
  },
]

ruleTester.run('brace-style-control-statements', rule, {
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
  ].map(code => ({code})),
})
