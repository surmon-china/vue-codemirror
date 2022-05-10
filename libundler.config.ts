import { defineConfig } from '@surmon-china/libundler'

export default defineConfig({
  libName: 'VueCodemirror',
  outFileName: 'vue-codemirror',
  entry: './src/index.ts',
  outDir: './dist',
  targets: ['esm', 'cjs'],
  external: ['vue', 'csstype', /@codemirror\/.*/],
  exports: 'named'
})
