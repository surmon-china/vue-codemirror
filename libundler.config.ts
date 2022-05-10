import { defineConfig } from '@surmon-china/libundler'

export default defineConfig({
  libName: 'VueCodemirror',
  outFileName: 'vue-codemirror',
  entry: './src/index.ts',
  outDir: './dist',
  targets: ['esm', 'umd'],
  external: ['vue'],
  exports: 'named',
  sourcemap: false,
  globals: {
    vue: 'Vue'
  }
})
