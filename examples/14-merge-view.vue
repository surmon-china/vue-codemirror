<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>CodeMirror Merge Example</span>
        <span>&nbsp;&nbsp;&nbsp;</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/14-merge-view.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="codemirror">
        <!-- codemirror-merge -->
        <codemirror :merge="true"
                    :options="cmOption" 
                    @cursorActivity="onCmCursorActivity"
                    @ready="onCmReady"
                    @focus="onCmFocus"
                    @blur="onCmBlur"
                    @input="onCmInput"
                    @scroll="onCmScroll">
        </codemirror>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>

  // language
  import 'codemirror/mode/css/css.js'
  import 'codemirror/mode/xml/xml.js'
  import 'codemirror/mode/htmlmixed/htmlmixed.js'

  // merge css
  import 'codemirror/addon/merge/merge.css'

  // merge js
  import 'codemirror/addon/merge/merge.js'

  // google DiffMatchPatch
  import DiffMatchPatch from 'diff-match-patch'

  // DiffMatchPatch config with global
  window.diff_match_patch = DiffMatchPatch
  window.DIFF_DELETE = -1
  window.DIFF_INSERT = 1
  window.DIFF_EQUAL = 0

  export default {
    data() {
      let html = document.documentElement.innerHTML
                 .replace(/<style([\s\S]*?)<\/style>/ig, '')
                 .replace(/></ig, '>\n<')
      const orig1 = html.replace('surmon@foxmail.com', 'surmon.me@gmail.com')
      const orig2 = html.replace('surmon@foxmail.com', 'surmon.me@gmail.com')
                        .replace('content="320"', 'content="360"')
                        .replace(/<title>([\s\S]*?)<\/title>/ig, '<title>test title</title>')
      // console.log('html', html, 'orig1', 'orig2', orig2)
      return {
        cmOption: {
          value: html,
          origLeft: null,
          orig: orig2,
          connect: 'align',
          mode: 'text/html',
          lineNumbers: true,
          collapseIdentical: false,
          highlightDifferences: true
        }
      }
    },
    methods: {
      onCmCursorActivity(a, b, c) {
        console.log('onCmCursorActivity', a, b, c)
      },
      onCmReady(a, b, c) {
        console.log('onCmReady', a, b, c)
      },
      onCmFocus(a, b, c) {
        console.log('onCmFocus', a, b, c)
      },
      onCmBlur(a, b, c) {
        console.log('onCmBlur', a, b, c)
      },
      onCmInput(code) {
        console.log('onCmInput', code)
      },
      onCmScroll() {
        console.log('onCmScroll')
      }
    }
  }
</script>

