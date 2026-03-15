import path from 'node:path'
import typescript from 'typescript-eslint'
import {fileURLToPath} from 'node:url'
import {preferRelativeImports} from '../preferRelativeImports'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = preferRelativeImports as unknown as Rule.RuleModule
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '../../..')
const tsconfigPath = path.join(projectRoot, 'tsconfig.json')

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      project: tsconfigPath,
      sourceType: 'module',
      tsconfigRootDir: projectRoot,
    },
  },
})

const externalPackageValid = [
  {
    code: "import {foo} from 'react'",
    filename: path.join(projectRoot, 'src/index.ts'),
  },
  {
    code: "import {foo} from 'lodash'",
    filename: path.join(projectRoot, 'src/index.ts'),
  },
]

const relativeImportValid = [
  {
    code: "import {foo} from './sibling'",
    filename: path.join(projectRoot, 'src/index.ts'),
  },
  {
    code: "import {foo} from './child/module'",
    filename: path.join(projectRoot, 'src/index.ts'),
  },
]

const aliasImportInvalid = [
  {
    code: "import {foo} from '@lib/compare'",
    errors: [{messageId: 'preferRelativeForSibling'}],
    filename: path.join(projectRoot, 'src/index.ts'),
    output: "import {foo} from './lib/compare'",
  },
  {
    code: "import {foo} from '@lib/compare'",
    errors: [{messageId: 'preferRelativeForSibling'}],
    filename: path.join(projectRoot, 'src/lib/compare.ts'),
    output: "import {foo} from './compare'",
  },
]

ruleTester.run('prefer-relative-imports', rule, {
  invalid: [
    ...aliasImportInvalid,
  ],
  valid: [
    ...externalPackageValid,
    ...relativeImportValid,
  ],
})
