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
  {code: 'function foo() {}',
    name: 'single function'},
  {code: 'const foo = () => {}',
    name: 'single arrow function'},
  {code: 'class Foo {}',
    name: 'single class'},
  {code: 'interface Foo {}',
    name: 'single interface'},
  {code: 'type Foo = {}',
    name: 'single type alias'},
  {code: 'enum Foo {}',
    name: 'single enum'},
  {code: 'declare function foo(): void',
    name: 'single declare function'},
  {code: 'const foo = 1',
    name: 'single const'},
  {code: 'export const foo = 1',
    name: 'single export const'},
  {code: 'export {foo} from "./foo"',
    name: 'single re-export'},
  {code: 'export {foo, bar} from "./foo"',
    name: 'multiple re-exports'},
  {
    code: 'function foo() {}',
    filename: '/test/foo.test.ts',
    name: 'test file exempt',
  },
  {
    code: 'function foo() {}',
    filename: '/test/foo.spec.ts',
    name: 'spec file exempt',
  },
  {
    code: 'function foo() {}',
    filename: '/test/foo.config.ts',
    name: 'config file exempt',
  },
]

const invalid = [
  {
    code: 'function foo() {}\nfunction bar() {}',
    errors: [
      {message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.'},
    ],
    name: 'two functions',
  },
  {
    code: 'function foo() {}\nclass Bar {}',
    errors: [
      {message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.'},
    ],
    name: 'function and class',
  },
  {
    code: 'interface Foo {}\ninterface Bar {}',
    errors: [
      {message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.'},
    ],
    name: 'two interfaces',
  },
  {
    code: 'type Foo = {}\ntype Bar = {}',
    errors: [
      {message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.'},
    ],
    name: 'two type aliases',
  },
  {
    code: 'function foo() {}\ninterface Bar {}',
    errors: [
      {message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.'},
    ],
    name: 'function and interface',
  },
  {
    code: 'const foo = () => {}\nconst bar = () => {}',
    errors: [
      {message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.'},
    ],
    name: 'two arrow functions',
  },
  {
    code: 'function foo() {}\nfunction bar() {}\nfunction baz() {}',
    errors: [
      {message: 'File has 3 declarations. Put each function/class/const/type declaration in its own file.'},
    ],
    name: 'three functions',
  },
  {
    code: 'enum Foo {}\nfunction bar() {}',
    errors: [
      {message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.'},
    ],
    name: 'enum and function',
  },
  {
    code: 'declare function foo(): void\nfunction bar() {}',
    errors: [
      {message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.'},
    ],
    name: 'declare function and function',
  },
  {
    code: 'export const foo = 1\nexport const bar = 2',
    errors: [
      {message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.'},
    ],
    name: 'two export consts',
  },
  {
    code: 'function foo() {}\nexport const bar = 1',
    errors: [
      {message: 'File has 2 declarations. Put each function/class/const/type declaration in its own file.'},
    ],
    name: 'function and export const',
  },
]

ruleTester.run('max-declarations-per-file', rule, {invalid, valid})
