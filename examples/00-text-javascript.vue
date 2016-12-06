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
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/00-text-javascript.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="codemirror">
        <!-- codemirror -->
        <codemirror v-model="code" :options="editorOption" :hint="true"></codemirror>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>
  export default {
    data() {
      return {
        code :
`import examples from 'components/vue-codemirror/examples'
export default {
  data () {
    // 这是一个包含、代码提示、折叠、选中、sublime模式...的编辑器
    // 按下Ctrl键可以体验代码提示
    // 可以尝试sublime下的快捷键操作
    return {
      exampleCode: 'const a = 10',
      editorOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        // mode: 'text/javascript',
        mode: {
          name: "javascript",
          json: true
        },
        lineWrapping: true,
        theme: 'default'
      }
    }
  },
  components: examples
}`,
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
          // hint.js的配置项
          hintOptions:{
            //当匹配只有一项的时候是否自动补全
            completeSingle: false
          },
          //快捷键 可提供三种模式 sublime、emacs、vim
          keyMap: "sublime",
          matchBrackets: true,
          showCursorWhenSelecting: true,
          theme: "monokai",
          extraKeys: { "Ctrl": "autocomplete" }
        }
      }
    }
  }
</script>

<style>
  .CodeMirror-focused .cm-matchhighlight {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFklEQVQI12NgYGBgkKzc8x9CMDAwAAAmhwSbidEoSQAAAABJRU5ErkJggg==);
    background-position: bottom;
    background-repeat: repeat-x;
  }
  .cm-matchhighlight {background-color: lightgreen}
  .CodeMirror-selection-highlight-scrollbar {background-color: green}
</style>
