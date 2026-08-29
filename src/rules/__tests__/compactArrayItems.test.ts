import {compactArrayItems} from '../compactArrayItems'
import {dedentAndStrip} from '@borela-tech/ts-toolbox'
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
  code: dedentAndStrip`
    const foo = [{
      id: 1,
    }, {
      id: 2,
    }]
  `,
  name: 'already compact (bracket inline with multiline items)',
}, {
  code: dedentAndStrip`
    const foo = [
      1,
      2,
      3,
    ]
  `,
  name: 'primitive values array (no objects or nested arrays)',
}, {
  code: dedentAndStrip`
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
}, {
  code: dedentAndStrip`
    const list = new FieldList<Field<string>>({
      initialValue: [
        new Field({
          initialValue: 'foo',
          validation: {
            rules: [
              v => (v === 'invalid' ? ['invalid value'] : []),
            ],
          },
        }),
      ],
      itemFactory: v => new Field({initialValue: v}),
    })
  `,
  name: 'single NewExpression element not compacted',
}, {
  code: dedentAndStrip`
    const list = new FieldList<Field<string>>({
      initialValue: [
        new Field({
          initialValue: 'a',
          validation: {
            rules: [v => (v === 'a'
              ? [
                'first error',
                'second error',
              ]
              : [])],
          },
        }),
        new Field({
          initialValue: 'b',
          validation: {rules: [v => (v === 'b' ? ['third error'] : [])]},
        }),
      ],
      itemFactory: v => new Field({initialValue: v}),
    })
  `,
  name: 'two NewExpression elements not compacted',
}, {
  code: dedentAndStrip`
    const arr = [
      new Foo({a: 1}),
      new Bar({b: 2}),
    ]
  `,
  name: 'CallExpression/NewExpression items ignored',
}] as const

const invalid = [{
  code: dedentAndStrip`
    const foo = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ]
  `,
  errors: [{messageId: 'compactItems'}],
  name: 'ObjectExpression items',
  output: dedentAndStrip`
    const foo = [{
        id: 1,
      }, {
        id: 2,
      }]
  `,
}, {
  code: dedentAndStrip`
    const foo = [
      [
        1,
        2,
      ],
      [
        3,
        4,
      ],
    ]
  `,
  errors: [{messageId: 'compactItems'}],
  name: 'ArrayExpression items',
  output: dedentAndStrip`
    const foo = [[
        1,
        2,
      ], [
        3,
        4,
      ]]
  `,
}, {
  code: dedentAndStrip`
    const foo = [
      {
        items: [1, 2]
      },
      {
        items: [3, 4]
      },
    ]
  `,
  errors: [{messageId: 'compactItems'}],
  name: 'mixed items with nested arrays',
  output: dedentAndStrip`
    const foo = [{
        items: [1, 2]
      }, {
        items: [3, 4]
      }]
  `,
}, {
  code: dedentAndStrip`
    const arr = [
      {
        id: 1,
        name: 'bar',
      },
      {
        id: 2,
        name: 'baz',
      },
    ]
  `,
  errors: [{messageId: 'compactItems'}],
  name: 'multiline ObjectExpression items',
  output: dedentAndStrip`
    const arr = [{
        id: 1,
        name: 'bar',
      }, {
        id: 2,
        name: 'baz',
      }]
  `,
}] as const

const ruleTester = new RuleTester()
ruleTester.run(
  'compact-array-items',
  compactArrayItems,
  {invalid, valid},
)
