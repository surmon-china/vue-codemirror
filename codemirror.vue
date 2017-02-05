<template>
  <textarea></textarea>
</template>

<script>
  var CodeMirror = require('codemirror/lib/codemirror.js')
  var CodeMirrorMetas = require('./metas.js')
  require('codemirror/lib/codemirror.css')
  require('codemirror/addon/display/fullscreen.css')
  require('codemirror/addon/display/fullscreen.js')
  export default {
    data: function() {
      return {
        content: ''
      }
    },
    props: {
      hint: Boolean,
      code: String,
      value: String,
      unseenLines: Array,
      marker: Function,
      options: {
        type: Object,
        default: function() {
          return {
            styleActiveLine: true,
            lineNumbers: true,
            mode: 'text/javascript',
            lineWrapping: true
          }
        }
      },
    },
    created: function() {
      this.options  = this.options || {}
      var language  = this.options.mode || 'text/javascript'
      var theme     = this.options.theme
      var hint      = this.hint || false
      var hints     = ['css', 'html', 'javascript', 'sql', 'xml']

      // string config
      if (typeof language == 'string') {

        let lang = CodeMirrorMetas.findModeByMIME(language)
        language = !lang ? lang : lang.mode

      } else if (typeof language == 'object') {

        let lang = CodeMirrorMetas.findModeByName(language.name)
        if (lang) {
          language = lang.mode
        } else {
         return console.error('CodeMirror language mode: ' + language.name + ' configuration error (CodeMirror语言模式配置错误，或者不支持此语言) See http://codemirror.net/mode/ for more details.')
        }
      }

      // require hint config
      if (hint) {
        require('codemirror/addon/hint/show-hint.js')
        require('codemirror/addon/hint/show-hint.css')
        var isAnyword = hints.indexOf(language) == -1
        require('codemirror/addon/hint/' + (isAnyword ? 'anyword' : language) + '-hint.js')
      }

      // require active-line.js
      if (this.options.styleActiveLine) require('codemirror/addon/selection/active-line.js')

      // require closebrackets.js
      if (this.options.autoCloseBrackets) require('codemirror/addon/edit/closebrackets.js')

      // require closetag.js
      if (this.options.autoCloseTags) require('codemirror/addon/edit/closetag.js')

      // require styleSelectedText.js
      if (this.options.styleSelectedText) {
        require('codemirror/addon/selection/mark-selection.js')
        require('codemirror/addon/search/searchcursor.js')
      }

      // highlightSelectionMatches
      if (this.options.highlightSelectionMatches) {
        require('codemirror/addon/scroll/annotatescrollbar.js')
        require('codemirror/addon/search/matchesonscrollbar.js')
        require('codemirror/addon/search/searchcursor.js')
        require('codemirror/addon/search/match-highlighter.js')
      }

      // require emacs
      if (!!this.options.keyMap && ['emacs', 'sublime', 'vim'].indexOf(this.options.keyMap) > -1) {
        require('codemirror/mode/clike/clike.js')
        require('codemirror/addon/edit/matchbrackets.js')
        require('codemirror/addon/comment/comment.js')
        require('codemirror/addon/dialog/dialog.js')
        require('codemirror/addon/dialog/dialog.css')
        require('codemirror/addon/search/searchcursor.js')
        require('codemirror/addon/search/search.js')
        // console.log(this.options.keyMap)
        require('codemirror/keymap/'+ this.options.keyMap +'.js')
      }

      // require fold js
      if (this.options.foldGutter) {
        require('codemirror/addon/fold/foldgutter.css')
        require('codemirror/addon/fold/brace-fold.js')
        require('codemirror/addon/fold/comment-fold.js')
        require('codemirror/addon/fold/foldcode.js')
        require('codemirror/addon/fold/foldgutter.js')
        require('codemirror/addon/fold/indent-fold.js')
        require('codemirror/addon/fold/markdown-fold.js')
        require('codemirror/addon/fold/xml-fold.js')
      }

      // require language mode config
      language = language || 'javascript'
      if (language !== 'null') require('codemirror/mode/' + language + '/' + language + '.js')

      // require theme config
      if (!!theme && theme == 'solarized light') theme = 'solarized'
      if (!!theme && theme != 'default') require('codemirror/theme/' + theme + '.css')
    },
    ready: function() {
      var _this = this
      this.editor = CodeMirror.fromTextArea(this.$el, this.options)
      this.editor.setValue(this.code || this.value || this.content)
      this.editor.on('change', function(cm) {
        _this.content = cm.getValue()
        // _this.value = cm.getValue()
        _this.code = cm.getValue()
      })
    },
    mounted: function() {
      var _this = this
      this.editor = CodeMirror.fromTextArea(this.$el, this.options)
      this.editor.setValue(this.code || this.value || this.content)
      this.editor.on('change', function(cm) {
        _this.content = cm.getValue()
        if (!!_this.$emit) {
          _this.$emit('changed', _this.content)
          _this.$emit('input', _this.content)
        }
      })
      this.unseenLineMarkers()
      // prevents funky dynamic rendering
      window.setTimeout(function() {
        _this.editor.refresh()
      }, 0)
    },
    beforeDestroy: function() {
      // garbage cleanup
      this.editor.doc.cm.getWrapperElement().remove()
    },
    watch: {
      'code': function(newVal, oldVal) {
        const editor_value = this.editor.getValue()
        if (newVal !== editor_value) {
          let scrollInfo = this.editor.getScrollInfo()
          this.editor.setValue(newVal)
          this.content = newVal
          this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
        }
        this.unseenLineMarkers()
      },
      'value': function(newVal, oldVal) {
        const editor_value = this.editor.getValue()
        if (newVal !== editor_value) {
          let scrollInfo = this.editor.getScrollInfo()
          this.editor.setValue(newVal)
          this.content = newVal
          this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
        }
        this.unseenLineMarkers()
      }
    },
    methods: {
      unseenLineMarkers: function () {
        var _this = this
        if (_this.unseenLines !== undefined && _this.marker !== undefined) {
          _this.unseenLines.forEach(line => {
            var info = _this.editor.lineInfo(line)
            _this.editor.setGutterMarker(line, "breakpoints", info.gutterMarkers ? null : _this.marker())
          })
        }
      }
    }
  }
</script>

<style>
  .CodeMirror-code {
    line-height: 1.6em;
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  }
</style>
