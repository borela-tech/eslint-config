import typescript from 'typescript-eslint'
import {maxDeclarationsPerFile} from '../maxDeclarationsPerFile'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = maxDeclarationsPerFile as unknown as Rule.RuleModule
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
  {code: 'class Foo {}'},
  {code: 'interface Foo {}'},
  {code: 'type Foo = {}'},
  {code: 'enum Foo {}'},
  {code: 'declare function foo(): void'},
  {code: 'const foo = 1'},
  {code: 'export const foo = 1'},
  {code: 'export { foo } from "./foo"'},
  {code: 'export { foo, bar } from "./foo"'},
  {
    code: 'function foo() {}',
    filename: '/test/foo.test.ts',
  },
  {
    code: 'function foo() {}',
    filename: '/test/foo.spec.ts',
  },
  {
    code: 'function foo() {}',
    filename: '/test/foo.config.ts',
  },
]

const invalid = [
  {
    code: 'function foo() {}\nfunction bar() {}',
    errors: [
      {
        data: {count: 2, functions: 2, types: 0},
        messageId: 'tooManyDeclarations',
      },
    ],
  },
  {
    code: 'function foo() {}\nclass Bar {}',
    errors: [
      {
        data: {count: 2, functions: 2, types: 0},
        messageId: 'tooManyDeclarations',
      },
    ],
  },
  {
    code: 'interface Foo {}\ninterface Bar {}',
    errors: [
      {
        data: {count: 2, functions: 0, types: 2},
        messageId: 'tooManyDeclarations',
      },
    ],
  },
  {
    code: 'type Foo = {}\ntype Bar = {}',
    errors: [
      {
        data: {count: 2, functions: 0, types: 2},
        messageId: 'tooManyDeclarations',
      },
    ],
  },
  {
    code: 'function foo() {}\ninterface Bar {}',
    errors: [
      {
        data: {count: 2, functions: 1, types: 1},
        messageId: 'tooManyDeclarations',
      },
    ],
  },
  {
    code: 'const foo = () => {}\nconst bar = () => {}',
    errors: [
      {
        data: {count: 2, functions: 2, types: 0},
        messageId: 'tooManyDeclarations',
      },
    ],
  },
  {
    code: 'function foo() {}\nfunction bar() {}\nfunction baz() {}',
    errors: [
      {
        data: {count: 3, functions: 3, types: 0},
        messageId: 'tooManyDeclarations',
      },
    ],
  },
  {
    code: 'enum Foo {}\nfunction bar() {}',
    errors: [
      {
        data: {count: 2, functions: 1, types: 1},
        messageId: 'tooManyDeclarations',
      },
    ],
  },
  {
    code: 'declare function foo(): void\nfunction bar() {}',
    errors: [
      {
        data: {count: 2, functions: 2, types: 0},
        messageId: 'tooManyDeclarations',
      },
    ],
  },
  {
    code: 'export const foo = 1\nexport const bar = 2',
    errors: [
      {
        data: {count: 2, functions: 0, types: 2},
        messageId: 'tooManyDeclarations',
      },
    ],
  },
  {
    code: 'function foo() {}\nexport const bar = 1',
    errors: [
      {
        data: {count: 2, functions: 1, types: 1},
        messageId: 'tooManyDeclarations',
      },
    ],
  },
]

ruleTester.run('max-declarations-per-file', rule, {
  invalid: invalid.map(c => ({...c})),
  valid: valid.map(c => ({...c})),
})
