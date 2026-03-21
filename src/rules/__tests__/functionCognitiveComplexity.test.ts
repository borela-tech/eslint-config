import typescript from 'typescript-eslint'
import {functionCognitiveComplexity} from '../functionCognitiveComplexity'
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
  {
    code: 'function foo() {}',
    name: 'empty function',
  },
  {
    code: 'const foo = () => {}',
    name: 'empty arrow',
  },
  {
    code: 'function bar() { if (x) return 1 }',
    name: 'function with single if',
  },
  {
    code: '() => x',
    name: 'arrow returning value',
  },
  {
    code: '() => { if (x) return 1 }',
    name: 'arrow with single if',
  },
  {
    code: '() => { for (;;) {} }',
    name: 'arrow with empty for',
  },
  {
    code: '() => { try {} catch {} }',
    name: 'arrow with empty try-catch',
  },
  {
    code: '() => x ? a : b',
    name: 'arrow with ternary',
  },
  {
    code: '() => a && b && c',
    name: 'arrow with logical and',
  },
  {
    code: 'function foo() { if (x) return 1 }',
    name: 'function at max complexity',
    options: [{maxCognitiveComplexity: 1}],
  },
]

const invalid = [
  {
    code: 'function foo() { if (a) if (b) if (c) if (d) if (e) if (f) if (g) if (h) if (i) if (j) if (k) if (l) if (m) if (n) if (o) return 1 }',
    errors: [
      {messageId: 'tooHighCognitiveComplexity'},
    ],
    name: 'named function with many nested ifs',
  },
  {
    code: '() => { if (a) if (b) if (c) return 1 }',
    errors: [
      {messageId: 'tooHighCognitiveComplexityAnonymous'},
    ],
    name: 'arrow with nested ifs exceeds max',
    options: [{maxCognitiveComplexity: 5}],
  },
  {
    code: 'function foo() { for (;;) { for (;;) { for (;;) {} } } }',
    errors: [
      {messageId: 'tooHighCognitiveComplexity'},
    ],
    name: 'function with nested fors exceeds max',
    options: [{maxCognitiveComplexity: 5}],
  },
  {
    code: 'const foo = () => { if (a) if (b) if (c) if (d) return 1 }',
    errors: [
      {messageId: 'tooHighCognitiveComplexity'},
    ],
    name: 'arrow with four nested ifs exceeds max',
    options: [{maxCognitiveComplexity: 9}],
  },
  {
    code: 'function bar() { if (a) if (b) if (c) if (d) if (e) return 1 }',
    errors: [
      {messageId: 'tooHighCognitiveComplexity'},
    ],
    name: 'function with five nested ifs exceeds max',
    options: [{maxCognitiveComplexity: 10}],
  },
]

ruleTester.run('function-cognitive-complexity', rule, {invalid, valid})
