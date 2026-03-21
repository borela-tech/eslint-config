import {compactArrayItems} from '../compactArrayItems'
import {dedent} from './dedent'
import {RuleTester} from '@typescript-eslint/rule-tester'

const valid = [{
  code: 'const foo = [{id: 1}]',
  name: 'single-element array',
}, {
  code: 'const foo = [1, 2]',
  name: 'single-line primitive array',
}, {
  code: 'const foo = [{id: 1}, {id: 2}]',
  name: 'single-line object array',
}, {
  code: 'const foo = [{id: 1}, {id: 2}]',
  name: 'single-line items with bracket inline',
}, {
  code: dedent`
    const foo = [{
      id: 1,
    }, {
      id: 2,
    }]
  `,
  name: 'already compact (bracket inline with multiline items)',
}, {
  code: dedent`
    const foo = [
      1,
      2,
      3,
    ]
  `,
  name: 'primitive values array (no objects or nested arrays)',
}, {
  code: dedent`
    const foo = [
      'a',
      'b',
      'c',
    ]
  `,
  name: 'string values array',
}, {
  code: 'const foo = [[1, 2]]',
  name: 'single nested array',
}] as const

const invalid = [{
  code: 'const foo = [\n  {\n    id: 1,\n  },\n  {\n    id: 2,\n  },\n]',
  errors: [{messageId: 'compactItems'}],
  name: 'ObjectExpression items',
  output: 'const foo = [{\n    id: 1,\n  }, {\n    id: 2,\n  }]',
}, {
  code: 'const foo = [\n  [\n    1,\n    2,\n  ],\n  [\n    3,\n    4,\n  ],\n]',
  errors: [{messageId: 'compactItems'}],
  name: 'ArrayExpression items',
  output: 'const foo = [[\n    1,\n    2,\n  ], [\n    3,\n    4,\n  ]]',
}, {
  code: 'const foo = [\n  {\n    items: [1, 2]\n  },\n  {\n    items: [3, 4]\n  },\n]',
  errors: [{messageId: 'compactItems'}],
  name: 'mixed items with nested arrays',
  output: 'const foo = [{\n    items: [1, 2]\n  }, {\n    items: [3, 4]\n  }]',
}, {
  code: "const arr = [\n  {\n    id: 1,\n    name: 'bar',\n  },\n  {\n    id: 2,\n    name: 'baz',\n  },\n]",
  errors: [{messageId: 'compactItems'}],
  name: 'multiline ObjectExpression items',
  output: "const arr = [{\n    id: 1,\n    name: 'bar',\n  }, {\n    id: 2,\n    name: 'baz',\n  }]",
}] as const

const ruleTester = new RuleTester()
ruleTester.run(
  'compact-array-items',
  compactArrayItems,
  {invalid, valid},
)
