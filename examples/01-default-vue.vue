<template>
  <md-card>
    <md-card-actions v-md-ink-ripple>
      <div class="md-subhead">
        <span>mode: {{ editorOption.mode.ext }}</span>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <span>theme: {{ editorOption.theme }}</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/01-default-vue.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="vue">
        <div class="codemirror">
          <!-- codemirror -->
          <codemirror v-model="code" 
                      :options="editorOption"
                      @cursorActivity="onEditorCursorActivity"
                      @ready="onEditorReady"
                      @focus="onEditorFocus"
                      @blur="onEditorBlur">
          </codemirror>
        </div>
        <div class="pre">
          <pre>{{ code }}</pre>
        </div>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>

  // require active-line.js
  require('codemirror/addon/selection/active-line.js')

  // styleSelectedText
  require('codemirror/addon/selection/mark-selection.js')
  require('codemirror/addon/search/searchcursor.js')

  // highlightSelectionMatches
  require('codemirror/addon/scroll/annotatescrollbar.js')
  require('codemirror/addon/search/matchesonscrollbar.js')
  require('codemirror/addon/search/searchcursor.js')
  require('codemirror/addon/search/match-highlighter.js')

  // keyMap
  require('codemirror/mode/clike/clike.js')
  require('codemirror/addon/edit/matchbrackets.js')
  require('codemirror/addon/comment/comment.js')
  require('codemirror/addon/dialog/dialog.js')
  require('codemirror/addon/dialog/dialog.css')
  require('codemirror/addon/search/searchcursor.js')
  require('codemirror/addon/search/search.js')
  require('codemirror/keymap/sublime.js')

  // foldGutter
  require('codemirror/addon/fold/foldgutter.css')
  require('codemirror/addon/fold/brace-fold.js')
  require('codemirror/addon/fold/comment-fold.js')
  require('codemirror/addon/fold/foldcode.js')
  require('codemirror/addon/fold/foldgutter.js')
  require('codemirror/addon/fold/indent-fold.js')
  require('codemirror/addon/fold/markdown-fold.js')
  require('codemirror/addon/fold/xml-fold.js')

  export default {
    data() {
      const code =
`<template>
  <h1>Hello World!</h1>
  <codemirror v-model="code" :options="editorOption"></codemirror>
</template>

<script>
  // require('some-codemirror-resource')
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
          mode: 'text/javascript',
          keyMap: "sublime",
          matchBrackets: true,
          showCursorWhenSelecting: true,
          theme: "monokai",
          extraKeys: { "Ctrl": "autocomplete" },
          hintOptions:{
            completeSingle: false
          }
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
      return {
        code,
        editorOption: {
          tabSize: 4,
          foldGutter: true,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          keyMap: "sublime",
          mode: {
            ext: 'vue'
          },
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
    },
    methods: {
      onEditorCursorActivity(codemirror) {
        console.log('onEditorCursorActivity', codemirror)
      },
      onEditorReady(codemirror) {
        console.log('onEditorReady', codemirror)
      },
      onEditorFocus(codemirror) {
        console.log('onEditorFocus', codemirror)
      },
      onEditorBlur(codemirror) {
        console.log('onEditorBlur', codemirror)
      }
    }
  }
</script>
