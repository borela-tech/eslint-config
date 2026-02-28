# @borela-tech/eslint-config

[![CI](https://github.com/borela-tech/eslint-config/actions/workflows/ci.yml/badge.svg)](https://github.com/borela-tech/eslint-config/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/@borela-tech%2Feslint-config.svg)](https://badge.fury.io/js/@borela-tech%2Feslint-config)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Node Version](https://img.shields.io/badge/node-v24.1.0-brightgreen)

Shared ESLint configuration for Borela Tech projects.

## Features

- Preconfigured ESLint rules
- Includes recommended rules from:
    - ESLint
    - TypeScript
    - React (if applicable)
- Custom rules for consistent import/export organization

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

This package includes several custom ESLint rules to enforce consistent import and export organization. All rules are auto-fixable.

### `sorted-imports`

Enforces imports are sorted alphabetically within their respective groups:

1. **Side-effect imports** (e.g., `import 'module'`)
2. **Default imports** (e.g., `import React from 'react'`)
3. **Named imports** (e.g., `import { useState } from 'react'`)
4. **Type imports** (e.g., `import type { Config } from 'module'`)

Within each group, imports are sorted alphabetically by module source. Named import specifiers within each import are also sorted alphabetically.

### `sorted-re-exports`

Enforces re-exports are sorted alphabetically within their respective groups:

1. **Re-export all** (e.g., `export * from 'module'`)
2. **Re-export named** (e.g., `export { foo, bar } from 'module'`)
3. **Re-export type** (e.g., `export type { Type1, Type2 } from 'module'`)

Within each group, re-exports are sorted alphabetically by module source. Named export specifiers are also sorted alphabetically.

### `imports-and-re-exports-at-top`

Ensures all imports and re-exports appear at the top of the file before any other statements.

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
