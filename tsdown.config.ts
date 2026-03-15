import path from 'path'
import {defineConfig} from 'tsdown'

export default defineConfig(options => {
  return {
    ...options,
    alias: {
      '@lib': path.resolve(process.cwd(), 'src/lib'),
    },
    clean: true,
    deps: {
      skipNodeModulesBundle: true,
    },
    dts: true,
    entry: {
      index: 'src/index.ts',
    },
    format: ['esm'],
    sourcemap: true,
    splitting: false,
  }
})
