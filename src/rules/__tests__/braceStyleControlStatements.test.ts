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
  {code: 'if (foo)\n  return'},
]

const elseValid = [
  {code: 'if (foo) {\n  bar()\n}\n  else {\n  }'},
  {code: 'if (foo) {\n  bar()\n}\n  else\n    baz()'},
]

const elseIfValid = [
  {code: 'if (foo) {\n  bar()\n}\n  else if (bar) {\n  }'},
  {code: 'if (foo) {\n  bar()\n}\n  else if (bar) {\n    baz()\n  }'},
  {code: 'if (foo) {\n  bar()\n}\n  else if (bar) {\n  }\n  else {\n  }'},
]

const forValid = [
  {code: 'for (;;)\n  return'},
]

const whileValid = [
  {code: 'while (foo)\n  return'},
]

const doWhileValid = [
  {code: 'do \n  return\nwhile (foo)'},
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

const forInvalid = [
  {
    code: 'for (;;) return',
    errors: [{messageId: 'singleLine'}],
    output: 'for (;;) {\n  return\n}',
  },
]

const whileInvalid = [
  {
    code: 'while (foo) return',
    errors: [{messageId: 'singleLine'}],
    output: 'while (foo) {\n  return\n}',
  },
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
  ],
})
