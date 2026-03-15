import dts from 'vite-plugin-dts'
import path from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['es'],
    },
    minify: false,
    rollupOptions: {
      external: [
        /^@?eslint/,
        /^@?typescript/,
        /^@?stylistic/,
        /^@?react/,
        /^node:/,
      ],
      output: {
        entryFileNames: 'index.mjs',
      },
    },
    sourcemap: true,
    target: 'node18',
  },
  plugins: [
    dts({
      exclude: ['src/**/__tests__/**'],
      include: ['src/'],
      rollupTypes: true,
      tsconfigPath: './tsconfig.json',
    }),
  ],
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, 'src/lib'),
    },
  },
})
