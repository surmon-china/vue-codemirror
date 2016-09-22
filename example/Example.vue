<template>
  <div class="Example">
    <h4>It's Example page</h4>
    <p>Codemirror Example1：</p>
    <div>
      <input v-model="code">
      <codemirror :code.sync="code" :options="editorOption"></codemirror>
      <pre>{{ code }}</pre>
    </div>
    <p>Codemirror Example2：</p>
    <div>
      <input v-model="code">
      <codemirror :code.sync="css" :options="{ mode: 'css', tabSize: 4 }"></codemirror>
      <pre>{{ code }}</pre>
    </div>
  </div>
</template>

<script>

  // 模块配置
  export default {
    name: 'Example',
    data () {
      return {
        code: '<div></div>',
        css: '.class { display: block }',
        editorOption: {
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