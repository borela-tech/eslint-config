import dts from 'vite-plugin-dts'
import path from 'path'
import {defineConfig} from 'vite'

const config = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
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
      output: {
        entryFileNames: 'index.[format].js',
      },
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
