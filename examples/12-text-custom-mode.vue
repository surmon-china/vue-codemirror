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
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/12-text-x-mysql.vue">
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
  import { CodeMirror } from 'vue-codemirror'
  CodeMirror.defineMode('mymode', () => {
    return {
      token(stream, state) {
        if (stream.match("aaa")) {
          return "keyword"
        } else if (stream.match("111")) {
          return "number"
        } else {
          stream.next()
          return null
        }
      }
    }
  })
  export default {
    data() {
      return {
        code: `aaa bbb ccc 111 eee fff ggg`,
        editorOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          mode: 'mymode',
          theme: 'solarized light'
        }
      }
    }
  }
</script>

