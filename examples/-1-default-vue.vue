<template>
  <md-card>
    <md-card-actions v-md-ink-ripple>
      <div class="md-subhead">
        <span>mode: {{ editorOption.mode }}</span>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <span>theme: {{ editorOption.theme }}</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/-1-default-vue.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="vue">
        <div class="codemirror">
          <!-- codemirror -->
          <codemirror v-model="code" :options="editorOption"></codemirror>
        </div>
        <div class="pre">
          <pre>{{ code }}</pre>
        </div>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>
const code =
`<template>
  <h1>Hello World!</h1>
  <codemirror v-model="code" :options="editorOption" :hint="true"></codemirror>
</template>

<script>
  export default {
    data() {
      return {
        code: 'const A = 10',
        editorOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          foldGutter: true,
          styleSelectedText: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
          mode: 'text/javascript',
          hintOptions:{
            completeSingle: false
          },
          keyMap: "sublime",
          matchBrackets: true,
          showCursorWhenSelecting: true,
          theme: "monokai",
          extraKeys: { "Ctrl": "autocomplete" }
        }
      }
    }
  }
<\/script>

<style lang="scss">
  @import './sass/mixins';
  @import './sass/variables';
  main {
    position: relative;
  }
</style>`
  export default {
    data() {
      return {
        code,
        editorOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          mode: 'text/x-vue',
          theme: 'base16-dark',
          extraKeys: {
            'F11'(cm) {
              cm.setOption("fullScreen", !cm.getOption("fullScreen"))
            },
            'Esc'(cm) {
              if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false)
            }
          }
        }
      }
    }
  }
</script>

