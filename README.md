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
  - [TypeScript ESLint](https://typescript-eslint.io/)
  - [Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)
- 17 custom rules for consistent code organization:
  - [`brace-style-control-statements`](#brace-style-control-statements)
  - [`export-filename-match`](#export-filename-match)
  - [`function-call-argument-line-break`](#function-call-argument-line-break)
  - [`function-parameter-line-break`](#function-parameter-line-break)
  - [`imports-and-re-exports-at-top`](#imports-and-re-exports-at-top)
  - [`individual-imports`](#individual-imports)
  - [`individual-re-exports`](#individual-re-exports)
  - [`interface-property-line-break`](#interface-property-line-break)
  - [`multiline-union-type-aliases`](#multiline-union-type-aliases)
  - [`no-inline-object-type-parameters`](#no-inline-object-type-parameters)
  - [`no-unnecessary-braces`](#no-unnecessary-braces)
  - [`one-export-per-file`](#one-export-per-file)
  - [`prefer-inline-export`](#prefer-inline-export)
  - [`single-line-imports`](#single-line-imports)
  - [`single-line-re-exports`](#single-line-re-exports)
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
import {CONFIG} from '@borela-tech/eslint-config'
export default CONFIG
```

## Custom Rules

This package includes 17 custom ESLint rules to enforce consistent code organization. All custom rules are auto-fixable.

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
