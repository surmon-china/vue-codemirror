<template>
  <textarea></textarea>
</template>

<script>
  window.CodeMirror = require('codemirror')
  require('codemirror/lib/codemirror.css')
  require('codemirror/mode/meta')
  export default {
    name: 'codemirror',
    data: function() {
      return {
        content: ''
      }
    },
    props: {
      code: String,
      value: String,
      events: Array,
      unseenLines: Array,
      marker: Function,
      loadtheme: {
        type: Boolean,
        default: function() {
          return true
        }
      },
      debugger: {
        type: Boolean,
        default: function() {
          return true
        }
      },
      options: {
        type: Object,
        required: true
      },
    },
    created: function() {

      if (this.options.lineNumbers === undefined) {
        this.options.lineNumbers = true
      }
      if (this.options.lineWrapping === undefined) {
        this.options.lineWrapping = false
      }
      if (this.options.mode === undefined) {
        this.options.mode = 'text/javascript'
      }

      var theme = this.options.theme
      var language = this.options.mode
      var _debugger = this.debugger
      var _loadtheme = this.loadtheme
      var isCustomMode = !!CodeMirror.modes[language]

      // theme config
      if (theme && theme == 'solarized light') {
        theme = 'solarized'
      }

      // console.log(language, CodeMirror.modes.simplemode)

      // language string config
      if (typeof language == 'string') {
        var lang = CodeMirror.findModeByMIME(language)
        language = !lang ? lang : lang.mode

      // language object config
      } else if (typeof language == 'object') {

        if (language.name) {
          var lang = CodeMirror.findModeByName(language.name)
          if (lang) {
            language = lang.mode
            // this.options.mode = language
          } else {
            language = null
          }
        } else if (language.ext) {
          var lang = CodeMirror.findModeByExtension(language.ext)
          if (lang) {
            language = lang.mode
            // this.options.mode = language
          } else {
            language = null
          }
        } else if (language.mime) {
          var lang = CodeMirror.findModeByMIME(language.mime)
          if (lang) {
            language = lang.mode
            // this.options.mode = language
          } else {
            language = null
          }
        } else if (language.filename) {
          var lang = CodeMirror.findModeByFileName(language.filename)
          if (lang) {
            language = lang.mode
            // this.options.mode = language
          } else {
            language = null
          }
        }
      }
      
      // console.log('language', language, isCustomMode)

      if ((!language || language == 'null') && _debugger && !isCustomMode) {
        console.warn('CodeMirror language mode: ' + language + ' configuration error (CodeMirror语言模式配置错误，或者不支持此语言) See http://codemirror.net/mode/ for more details.')
        // return false
      }

      // console.log(language, theme)

      // require language
      if (language && language !== 'null') {
        require('codemirror/mode/' + language + '/' + language + '.js')
      }

      // require theme
      if (theme && _loadtheme) {
        require('codemirror/theme/' + theme + '.css')
      }
    },
    mounted: function() {
      var _this = this
      this.editor = CodeMirror.fromTextArea(this.$el, this.options)
      this.editor.setValue(this.code || this.value || this.content)
      this.editor.on('change', function(cm) {
        _this.content = cm.getValue()
        if (!!_this.$emit) {
          _this.$emit('change', _this.content)
          _this.$emit('input', _this.content)
        }
      })
      var events = [
        'scroll',
        'changes',
        'beforeChange',
        'cursorActivity',
        'keyHandled',
        'inputRead',
        'electricInput',
        'beforeSelectionChange',
        'viewportChange',
        'swapDoc',
        'gutterClick',
        'gutterContextMenu',
        'focus',
        'blur',
        'refresh',
        'optionChange',
        'scrollCursorIntoView',
        'update'
      ];
      if (this.events && this.events.length) {
        events = events.concat(this.events)
      }
      for (var i = 0; i < events.length; i++) {
        if (events.indexOf(events[i]) == i) {
          (function(event) {
            _this.editor.on(event, function(a, b, c) {
              _this.$emit(event, a, b, c)
            })
          })(events[i])
        }
      }
      this.$emit('ready', this.editor)
      this.unseenLineMarkers()

      // prevents funky dynamic rendering
      window.setTimeout(function() {
        _this.editor.refresh()
      }, 0)
    },
    beforeDestroy: function() {
      
      // garbage cleanup
      var element = this.editor.doc.cm.getWrapperElement()
      if (element && element.remove) {
        element.remove()
      }
    },
    watch: {
      options: {
        deep: true,
        handler(options, oldOptions) {
          var key
          for (key in options) {
            this.editor.setOption(key, options[key])
          }
        }
      },
      code: function(newVal, oldVal) {
        var editor_value = this.editor.getValue()
        if (newVal !== editor_value) {
          var scrollInfo = this.editor.getScrollInfo()
          this.editor.setValue(newVal)
          this.content = newVal
          this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
        }
        this.unseenLineMarkers()
      },
      value: function(newVal, oldVal) {
        var editor_value = this.editor.getValue()
        if (newVal !== editor_value) {
          var scrollInfo = this.editor.getScrollInfo()
          this.editor.setValue(newVal)
          this.content = newVal
          this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
        }
        this.unseenLineMarkers()
      }
    },
    methods: {
      refresh: function() {
        this.editor.refresh()
      },
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
