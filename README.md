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
