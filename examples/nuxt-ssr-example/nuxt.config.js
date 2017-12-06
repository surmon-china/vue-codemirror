module.exports = {
  // some nuxt config...
  plugins: [
    { src: '~plugins/nuxt-codemirror-plugin.js', ssr: false }
  ],
  // some nuxt config...
  css: [
    // lib css
    'codemirror/lib/codemirror.css',
    // merge css
    'codemirror/addon/merge/merge.css'
    // theme css
    'codemirror/theme/base16-dark.css'
  ],
  // some nuxt config...
}
