<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>mode: {{ cmOption.mode }}</span>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <span>theme: {{ cmOption.theme }}</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/12-text-custom-mode.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="codemirror">
        <!-- codemirror -->
        <codemirror v-model="code" :options="cmOption"></codemirror>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>

  // theme css
  import 'codemirror/theme/solarized.css'
  import CodeMirror from 'codemirror'
  CodeMirror.defineMode('mymode', () => {
    return {
      token(stream, state) {
        if (stream.match("const")) {
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
        code: `const bbb = 222;\nconst ccc = 111;\neee fff ggg`,
        cmOption: {
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

