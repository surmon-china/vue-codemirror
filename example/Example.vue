<template>
  <div class="Example">
    <h1>It's Example page</h1>
    <h3>Codemirror Example1：</h3>
    <codemirror :code.sync="code" :options="editorOption"></codemirror>
    <pre>{{ code }}</pre>
    <hr>
    <h3>Codemirror Example2：</h3>
    <codemirror :code.sync="css" :options="{ mode: 'css', tabSize: 2 }"></codemirror>
    <pre>{{ css }}</pre>
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
          mode: 'htmlmixed',
          lineWrapping: true,
          theme: 'base16-dark'
        }
      }
    }
  }

</script>