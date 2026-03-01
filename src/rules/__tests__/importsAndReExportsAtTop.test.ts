import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {importsAndReExportsAtTop} from '../importsAndReExportsAtTop'
import {RuleTester} from 'eslint'

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

ruleTester.run('imports-and-re-exports-at-top', importsAndReExportsAtTop, {
  valid: [{
    code: dedent`
      import {a} from 'aaa'
      export {a} from 'aaa'
      const c = 1
    `,
  }, {
    code: dedent`
      import {a} from 'aaa'
      import {b} from 'bbb'
      export {c} from 'ccc'
    `,
  }, {
    code: dedent`
      import {a} from 'aaa'
      const c = 1
      function foo() {}
    `,
  }, {
    code: dedent`
      export {a} from 'aaa'
      export * from 'bbb'
      const c = 1
    `,
  }, {
    code: dedent`
      const c = 1
      function foo() {}
    `,
  }, {
    code: dedent`
      import {a} from 'aaa'
    `,
  }, {
    code: dedent`
      export {a} from 'aaa'
    `,
  }, {
    code: '',
  }],
  invalid: [{
    code: dedent`
      export {z} from 'zzz'
      const c = 1
      import {a} from 'aaa'
      function foo() {}
      export {b} from 'bbb'
    `,
    errors: [{messageId: 'importsAndReExportsAtTop'}],
    output: dedent`
      import {a} from 'aaa'
      export {z} from 'zzz'
      export {b} from 'bbb'
      const c = 1
      function foo() {}
    `,
  }, {
    code: dedent`
      const a = 1
      import {b} from 'bbb'
      export {c} from 'ccc'
    `,
    errors: [{messageId: 'importsAndReExportsAtTop'}],
    output: dedent`
      import {b} from 'bbb'
      export {c} from 'ccc'
      const a = 1
    `,
  }],
})
