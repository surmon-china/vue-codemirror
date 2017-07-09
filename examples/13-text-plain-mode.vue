<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>mode: {{ editorOption.mode }}</span>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <span>theme: {{ editorOption.theme }}</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/13-text-x-mysql.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="codemirror">
        <!-- codemirror -->
        <codemirror v-model="code" :options="editorOption"></codemirror>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>
  export default {
    data() {
      return {
        code: `The method of text plan based on XML, which is propounded by this dissertation, just march towards such direction showing as above.`,
        editorOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          lineWrapping: true,
          line: true,
          mode: 'text/plain',
          theme: 'solarized light'
        }
      }
    },
    mounted() {
      setTimeout(() => {
        this.code += 'haha~'
      }, 2000)
    }
  }
</script>

