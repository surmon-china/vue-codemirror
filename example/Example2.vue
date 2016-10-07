<template>
  <div class="Example">
    <h1>It's Example page with Vue.js2.X</h1>
    <h3>Codemirror Example:</h3>
    <codemirror :code="code" :options="editorOption" @changed="codeChange"></codemirror>
    <pre>{{ code }}</pre>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        code: '<div></div>',
        css: '.class { display: block }',
        editorOption: {
          tabSize: 4,
          styleActiveLine: true,
          line: true,
          mode: 'text/html',
          lineWrapping: true,
          theme: 'base16-dark'
        }
      }
    },
    methods: {
      codeChange(newCode) {
        console.log(newCode)
        this.code = newCode
      }
    }
  }
</script>