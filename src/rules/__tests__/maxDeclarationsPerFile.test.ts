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
  {code: 'export {foo} from "./foo"'},
  {code: 'export {foo, bar} from "./foo"'},
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
        message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.',
      },
    ],
  },
  {
    code: 'function foo() {}\nclass Bar {}',
    errors: [
      {
        message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.',
      },
    ],
  },
  {
    code: 'interface Foo {}\ninterface Bar {}',
    errors: [
      {
        message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.',
      },
    ],
  },
  {
    code: 'type Foo = {}\ntype Bar = {}',
    errors: [
      {
        message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.',
      },
    ],
  },
  {
    code: 'function foo() {}\ninterface Bar {}',
    errors: [
      {
        message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.',
      },
    ],
  },
  {
    code: 'const foo = () => {}\nconst bar = () => {}',
    errors: [
      {
        message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.',
      },
    ],
  },
  {
    code: 'function foo() {}\nfunction bar() {}\nfunction baz() {}',
    errors: [
      {
        message: 'File has 3 declarations. Put each function/class/const/type declaration in its own file.',
      },
    ],
  },
  {
    code: 'enum Foo {}\nfunction bar() {}',
    errors: [
      {
        message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.',
      },
    ],
  },
  {
    code: 'declare function foo(): void\nfunction bar() {}',
    errors: [
      {
        message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.',
      },
    ],
  },
  {
    code: 'export const foo = 1\nexport const bar = 2',
    errors: [
      {
        message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.',
      },
    ],
  },
  {
    code: 'function foo() {}\nexport const bar = 1',
    errors: [
      {
        message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.',
      },
    ],
  },
]

ruleTester.run('max-declarations-per-file', rule, {
  invalid,
  valid,
})
