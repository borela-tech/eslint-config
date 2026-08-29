# @borela-tech/eslint-config

[![CI](https://github.com/borela-tech/eslint-config/actions/workflows/ci.yml/badge.svg)](https://github.com/borela-tech/eslint-config/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/@borela-tech%2Feslint-config.svg)](https://badge.fury.io/js/@borela-tech%2Feslint-config)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Node Version](https://img.shields.io/badge/node-v24.1.0-brightgreen)

Shared ESLint configuration for Borela Tech projects.

## Features

- Preconfigured ESLint rules
- Includes some rules from:
  - [ESLint](https://eslint.org/)
  - [Perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist)
  - [React](https://github.com/jsx-eslint/eslint-plugin-react)
  - [React Hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
  - [Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)
  - [TypeScript ESLint](https://typescript-eslint.io/)
  - [Unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
- 27 custom rules for consistent code organization:
  - [`array-items-line-break`](#array-items-line-break)
  - [`brace-style-control-statements`](#brace-style-control-statements)
  - [`brace-style-object-literal`](#brace-style-object-literal)
  - [`compact-array-items`](#compact-array-items)
  - [`export-filename-match`](#export-filename-match)
  - [`function-call-argument-line-break`](#function-call-argument-line-break)
  - [`function-cognitive-complexity`](#function-cognitive-complexity)
  - [`function-parameter-line-break`](#function-parameter-line-break)
  - [`imports-and-re-exports-at-top`](#imports-and-re-exports-at-top)
  - [`individual-imports`](#individual-imports)
  - [`individual-re-exports`](#individual-re-exports)
  - [`interface-property-line-break`](#interface-property-line-break)
  - [`max-declarations-per-file`](#max-declarations-per-file)
  - [`multiline-union-type-aliases`](#multiline-union-type-aliases)
  - [`naming-convention`](#naming-convention)
  - [`no-inline-object-types`](#no-inline-object-types)
  - [`no-unnecessary-braces`](#no-unnecessary-braces)
  - [`object-property-line-break`](#object-property-line-break)
  - [`one-export-per-file`](#one-export-per-file)
  - [`prefer-inline-export`](#prefer-inline-export)
  - [`single-line-arrow-function-parameters`](#single-line-arrow-function-parameters)
  - [`single-line-function-parameters`](#single-line-function-parameters)
  - [`single-line-imports`](#single-line-imports)
  - [`single-line-re-exports`](#single-line-re-exports)
  - [`single-line-test-description`](#single-line-test-description)
  - [`sorted-imports`](#sorted-imports)
  - [`sorted-re-exports`](#sorted-re-exports)

## Installation

```bash
npm install --save-dev @borela-tech/eslint-config
```

## Usage

Create a file named `eslint.config.ts` in the root of your project and add the 
following code:

```typescript
import {config} from '@borela-tech/eslint-config'
export {config as default}
```

## Custom Rules

This package includes 27 custom ESLint rules to enforce consistent code organization. Most custom rules are auto-fixable.

### `array-items-line-break`

Enforces each array item to be on its own line when the array expression exceeds 80 characters.

**Bad:**
```typescript
const a = [veryLongItemNameOne, veryLongItemNameTwo, veryLongItemNameThree]
```

**Good:**
```typescript
const a = [
  veryLongItemNameOne,
  veryLongItemNameTwo,
  veryLongItemNameThree,
]
```

### `brace-style-control-statements`

Enforces control statement bodies to be on a separate line from the condition.

**Bad:**
```typescript
if (foo) return
if (foo) {return}
```

**Good:**
```typescript
if (foo)
  return

if (foo) {
  return
}
```

### `brace-style-object-literal`

Enforces braces of multiline object literals to be on their own lines.

**Bad:**
```typescript
const x = {foo: 1,
  bar: 2}
```

**Good:**
```typescript
const x = {
  foo: 1,
  bar: 2,
}
```

### `compact-array-items`

Enforces arrays with multiline items (objects or arrays) to use a compact, inline bracket style, as long as the line does not exceed 80 characters.

**Bad:**
```typescript
const foo = [
  {
    id: 1,
  },
  {
    id: 2,
  },
]
```

**Good:**
```typescript
const foo = [{
  id: 1,
}, {
  id: 2,
}]
```

### `export-filename-match`

Enforces exported filenames match the default export name. Allows exceptions for `index.ts`, `.test.ts`, and `.spec.ts` files.

**Bad:**
```typescript
// file: utils.ts
export default function helper() {}
```

**Good:**
```typescript
// file: helper.ts
export default function helper() {}
```

### `function-call-argument-line-break`

Enforces line breaks in function call arguments when the line exceeds 80 characters.

**Bad:**
```typescript
const result = someFunctionWithAVeryLongName(arg1, arg2, arg3)
```

**Good:**
```typescript
const result = someFunctionWithAVeryLongName(
  arg1,
  arg2,
  arg3,
)
```

### `function-cognitive-complexity`

Enforces a cognitive complexity threshold (default 15) for functions.

**Bad:**
```typescript
function handleSubmit() {
  if (a) {
    if (b) {
      if (c) {
        if (d) {
          doSomething()
        }
      }
    }
  }
}
```

**Good:**
```typescript
function handleSubmit() {
  if (a && b && c && d) {
    doSomething()
  }
}
```

### `function-parameter-line-break`

Enforces line breaks in function parameters when the line exceeds 80 characters.

**Bad:**
```typescript
function myFunctionWithAVeryLongName(param1, param2, param3) {}
```

**Good:**
```typescript
function myFunctionWithAVeryLongName(
  param1,
  param2,
  param3,
) {}
```

### `imports-and-re-exports-at-top`

Ensures all imports and re-exports appear at the top of the file before any other statements.

**Bad:**
```typescript
const foo = 'bar'
import {baz} from 'module'
```

**Good:**
```typescript
import {baz} from 'module'
const foo = 'bar'
```

### `individual-imports`

Enforces one import per statement instead of grouped imports:

**Bad:**
```typescript
import {foo, bar, baz} from 'module'
```

**Good:**
```typescript
import {foo} from 'module'
import {bar} from 'module'
import {baz} from 'module'
```

### `individual-re-exports`

Enforces one re-export per statement instead of grouped re-exports:

**Bad:**
```typescript
export {foo, bar, baz} from 'module'
```

**Good:**
```typescript
export {foo} from 'module'
export {bar} from 'module'
export {baz} from 'module'
```

### `interface-property-line-break`

Enforces line breaks in interface properties when the line exceeds 80 characters.

**Bad:**
```typescript
interface Config {foo: string; bar: number; baz: boolean}
```

**Good:**
```typescript
interface Config {
  foo: string
  bar: number
  baz: boolean
}
```

### `max-declarations-per-file`

Enforces a single top-level declaration (function or type) per file. Allows exceptions for `.config`, `.model`, `.spec`, `.stories`, and `.test` files.

**Bad:**
```typescript
export function foo() {}
export function bar() {}
```

**Good:**
```typescript
// file: foo.ts
export function foo() {}

// file: bar.ts
export function bar() {}
```

### `multiline-union-type-aliases`

Enforces multiline union type aliases.

**Bad:**
```typescript
type Status = 'pending' | 'active' | 'completed'
```

**Good:**
```typescript
type Status =
  | 'pending'
  | 'active'
  | 'completed'
```

### `naming-convention`

Enforces consistent naming conventions:

- **React components** (functions returning `JSX.Element`, `ReactElement`, or `ReactNode`) use `PascalCase`
- **Wrapped components** (e.g., `memo(...)`, `forwardRef(...)`) use `PascalCase`
- **React contexts** (e.g., `createContext(...)`, `React.createContext(...)`) use `PascalCase`
- **Functions** use `camelCase`
- **Classes, enums, interfaces, and type aliases** use `PascalCase`
- **Variables** (`let`/`var`) use `camelCase`
- **Constants** (`const`) use `UPPER_CASE` when assigned a literal value, otherwise `camelCase` or `UPPER_CASE`
- Names prefixed with `_` (e.g., `_unused`) are exempt

**Bad:**
```typescript
const myButton = (): JSX.Element => null
const myButtons = memo(function MyButtons(): JSX.Element { return null; })
const appContext = createContext(null)
function my_function() {}
const MY_VALUE = 42
class myClass {}
```

**Good:**
```typescript
const MyButton = (): JSX.Element => null
const MyButtons = memo(function MyButtons(): JSX.Element { return null; })
const AppContext = createContext(null)
function myFunction() {}
const myValue = 42
class MyClass {}
```

### `no-inline-object-types`

Disallows inline object types in function parameters and return types. Converts them to named interfaces.

**Bad:**
```typescript
function foo(x: {a: string}) {}
let x: {a: string} = {a: ''}
```

**Good:**
```typescript
interface X {a: string}
function foo(x: X) {}

interface InlineType {a: string}
let x: InlineType = {a: ''}
```

### `no-unnecessary-braces`

Removes braces from single-line statements and adds braces to multi-line statements without braces.

**Bad:**
```typescript
if (condition) {
  doSomething()
}

if (condition)
  return {
    a: 1,
    b: 2,
    c: 3,
 }
```

**Good:**
```typescript
if (condition)
  doSomething()

if (condition) {
  return {
    a: 1,
    b: 2,
    c: 3,
 }
}
```

### `object-property-line-break`

Enforces object literal formatting based on complexity and line length. Mixed shorthand and non-shorthand properties must be multiline, while multiline objects that fit on one line are collapsed.

**Bad:**
```typescript
const a = {foo, bar: bar}

const b = {
  foo,
  bar,
}
```

**Good:**
```typescript
const a = {
  foo,
  bar: bar,
}

const b = {foo, bar}
```

### `one-export-per-file`

Enforces one export per file. Allows exceptions for `index.ts`, 
`.test.ts`, and `.spec.ts` files.

**Bad:**
```typescript
export const foo = 'bar'
export const baz = 'qux'
```

**Good:**
```typescript
// file: foo.ts
export const foo = 'bar'

// file: index.ts
export const foo = 'bar'
export const baz = 'qux'
```

### `prefer-inline-export`

Prefers inline exports.

**Bad:**
```typescript
class Foo {}
export {foo}
```

**Good:**
```typescript
export class Foo {}
```

### `single-line-arrow-function-parameters`

Ensures arrow function parameters are on a single line when they fit within 80 characters.

**Bad:**
```typescript
const fn = (
  x,
  y,
) => x + y
```

**Good:**
```typescript
const fn = (x, y) => x + y
```

### `single-line-function-parameters`

Ensures function parameters are on a single line when they fit within 80 characters.

**Bad:**
```typescript
function foo(
  bar,
  baz,
) {}
```

**Good:**
```typescript
function foo(bar, baz) {}
```

### `single-line-imports`

Ensures imports are on a single line (converts multiline imports to single line).

**Bad:**
```typescript
import {
  foo,
  bar,
} from 'module'
```

**Good:**
```typescript
import {foo, bar} from 'module'
```

### `single-line-re-exports`

Ensures re-exports are on a single line (converts multiline re-exports to single line).

**Bad:**
```typescript
export {
  foo,
  bar,
} from 'module'
```

**Good:**
```typescript
export {foo, bar} from 'module'
```

### `single-line-test-description`

Enforces Jest test descriptions to fit on a single line and within 80 characters (configurable via `maxLength`). Instead of breaking the call across lines, shorten the description. Applies to `it`, `test`, `describe` and variants such as `it.only`, `test.skip`, `describe.each`, etc.

**Bad:**
```typescript
it('throws when a different field is registered under an existing key', () => {})

it(
  'short desc',
  () => {},
)

describe('a very long description that definitely exceeds the eighty character limit for sure', () => {})
```

**Good:**
```typescript
it('short desc', () => {})

it('short', () => {
  expect(1).toBe(1)
})

describe('short', () => {})
```

### `sorted-imports`

Enforces imports are sorted alphabetically within their respective groups:

1. **Side-effect imports** (e.g., `import 'module'`)
2. **Default imports** (e.g., `import React from 'react'`)
3. **Named imports** (e.g., `import {useState} from 'react'`)
4. **Type imports** (e.g., `import type {Config} from 'module'`)

Within each group, imports are sorted alphabetically by module source. Named import specifiers within each import are also sorted alphabetically.

**Bad:**
```typescript
import {z, a} from 'module'
import type {Config} from 'config'
import React from 'react'
```

**Good:**
```typescript
import React from 'react'
import {a, z} from 'module'
import type {Config} from 'config' 
```

### `sorted-re-exports`

Enforces re-exports are sorted alphabetically within their respective groups:

1. **Re-export all** (e.g., `export * from 'module'`)
2. **Re-export named** (e.g., `export {foo, bar} from 'module'`)
3. **Re-export type** (e.g., `export type {Type1, Type2} from 'module'`)

Within each group, re-exports are sorted alphabetically by module source. Named export specifiers are also sorted alphabetically.

**Bad:**
```typescript
export {bar} from 'module'
export * from 'another'
export type {TypeB} from 'types'
```

**Good:**
```typescript
export * from 'another'
export {bar} from 'module'
export type {TypeB} from 'types'
```
