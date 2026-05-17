import path from 'path'
import {defineConfig} from 'vite'

const config = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName(format) {
        return `index.${format === 'es' ? 'mjs' : 'cjs'}`
      },
      formats: ['es', 'cjs'],
    },
    minify: false,
    rolldownOptions: {
      external: [
        /^@?eslint/,
        /^@?typescript/,
        /^@?stylistic/,
        /^@?react/,
        'path',
      ],
    },
    sourcemap: true,
    target: 'node25',
  },
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, 'src/lib'),
    },
  },
})

export {config as default}
