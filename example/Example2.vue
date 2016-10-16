<template>
  <div class="Example">
    <h1>It's Example page with Vue.js2.X</h1>
    <h3>Codemirror Example:</h3>
    <codemirror :code="code" :options="editorOption" @changed="codeChange"></codemirror>
    <pre>{{ code }}</pre>
    <textarea v-model="code"></textarea>
    <hr>
    <h3>Codemirror Example2：</h3>
    <codemirror v-model="code2" :options="editorOption"></codemirror>
    <pre>{{ code2 }}</pre>
    <textarea v-model="code2"></textarea>
  </div>
</template>

<script>
  import { codemirror } from 'vue-codemirror'
  export default {
    components: {
      codemirror
    },
    data () {
      return {
        code: '<div>1</div>',
        code2: '<div>2</div>',
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