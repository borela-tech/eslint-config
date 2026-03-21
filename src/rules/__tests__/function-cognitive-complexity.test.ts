import typescript from 'typescript-eslint'
import {functionCognitiveComplexity} from '../function-cognitive-complexity'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = functionCognitiveComplexity as unknown as Rule.RuleModule
const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

const valid = [
  {code: 'function foo() {}'},
  {code: 'const foo = () => {}'},
  {code: 'function bar() { if (x) return 1 }'},
  {code: '() => x'},
  {code: '() => { if (x) return 1 }'},
  {code: '() => { for (;;) {} }'},
  {code: '() => { try {} catch {} }'},
  {code: '() => x ? a : b'},
  {code: '() => a && b && c'},
  {
    code: 'function foo() { if (x) return 1 }',
    options: [{maxCognitive: 1}],
  },
]

const invalid = [
  {
    code: 'function foo() { if (a) if (b) if (c) if (d) if (e) if (f) if (g) if (h) if (i) if (j) if (k) if (l) if (m) if (n) if (o) return 1 }',
    errors: [
      {
        messageId: 'tooHighCognitiveComplexity',
      },
    ],
  },
  {
    code: '() => { if (a) if (b) if (c) return 1 }',
    errors: [
      {
        messageId: 'tooHighCognitiveComplexityAnonymous',
      },
    ],
    options: [{maxCognitive: 5}],
  },
  {
    code: 'function foo() { for (;;) { for (;;) { for (;;) {} } } }',
    errors: [
      {
        messageId: 'tooHighCognitiveComplexity',
      },
    ],
    options: [{maxCognitive: 5}],
  },
  {
    code: 'const foo = () => { if (a) if (b) if (c) if (d) return 1 }',
    errors: [
      {
        messageId: 'tooHighCognitiveComplexity',
      },
    ],
    options: [{maxCognitive: 9}],
  },
  {
    code: 'function bar() { if (a) if (b) if (c) if (d) if (e) return 1 }',
    errors: [
      {
        messageId: 'tooHighCognitiveComplexity',
      },
    ],
    options: [{maxCognitive: 10}],
  },
]

ruleTester.run('function-cognitive-complexity', rule, {
  invalid: invalid.map(c => ({...c})),
  valid: valid.map(c => ({...c})),
})
