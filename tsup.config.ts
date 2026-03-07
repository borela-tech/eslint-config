import path from 'path'
import {defineConfig} from 'tsup'

export default defineConfig(options => {
  return {
    ...options,
    clean: true,
    dts: true,
    entry: {
      index: 'src/index.ts',
    },
    format: ['esm'],
    splitting: false,
    sourcemap: true,
    alias: {
      '@lib': path.resolve(process.cwd(), 'src/lib'),
    },
  }
})
