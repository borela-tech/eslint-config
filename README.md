# @borela-tech/eslint-config

Shared ESLint configuration for Borela Tech projects.

## Features

- Preconfigured ESLint rules
- Includes recommended rules from:
    - ESLint
    - TypeScript
    - React (if applicable)

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
