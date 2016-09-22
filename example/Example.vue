<template>
  <div class="Example">
    <h4>It's Example page</h4>
    <div>
      <input v-model="code">
      <codemirror :code.sync="code" :options="editorOption"></codemirror>
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