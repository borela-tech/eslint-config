import {dedent} from './dedent'
import {individualImports} from '../individualImports'
import {RuleTester} from '@typescript-eslint/rule-tester'

const singleImportValid = [
  {
    code: "import {foo} from 'bar'",
    name: 'single named import',
  },
  {
    code: "import foo from 'bar'",
    name: 'default import',
  },
  {
    code: "import * as foo from 'bar'",
    name: 'namespace import',
  },
  {
    code: "import 'bar'",
    name: 'side effect import',
  },
] as const

const multipleImportInvalid = [
  {
    code: "import {foo, bar} from 'baz'",
    errors: [{messageId: 'individualImports'}],
    name: 'two named imports',
    output: dedent`
      import {foo} from 'baz'
      import {bar} from 'baz'
    `,
  },
  {
    code: "import {foo, bar, baz} from 'qux'",
    errors: [{messageId: 'individualImports'}],
    name: 'three named imports',
    output: dedent`
      import {foo} from 'qux'
      import {bar} from 'qux'
      import {baz} from 'qux'
    `,
  },
] as const

const ruleTester = new RuleTester()
ruleTester.run('individual-imports', individualImports, {
  invalid: [
    ...multipleImportInvalid,
  ],
  valid: [
    ...singleImportValid,
  ],
})
