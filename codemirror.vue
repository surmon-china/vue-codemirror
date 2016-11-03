<template>
  <textarea></textarea>
</template>

<script>
  var CodeMirror = require('codemirror/lib/codemirror.js')
  var CodeMirrorMetas = require('./metas.js')
  require('codemirror/lib/codemirror.css')
  // var
  function makeMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#822";
    marker.innerHTML = "●";
    return marker;
  }
  export default {
    data: function() {
      return {
        content: ''
      }
    },
    props: {
      code: String,
      value: String,
      options: {
        type: Object,
        default: function() {
          return {
            styleActiveLine: true,
            lineNumbers: true,
            mode: 'text/javascript',
            lineWrapping: true,
            gutters: ["CodeMirror-linenumbers", "breakpoints"]
          }
        }
      },
    },
    created: function() {
      this.options  = this.options || {}
      var language  = this.options.mode || 'text/javascript'
      var theme     = this.options.theme

      // string config or object config
      var isString = (typeof language == 'string')
      // console.log(language, typeof language, isString)

      // string config
      if (isString) {
        try {
         language = CodeMirrorMetas.findModeByMIME(language).mode
        } catch (e) {
         throw new Error('CodeMirror language mode: ' + language + ' Configuration error (CodeMirror语言模式配置错误，或者不支持此语言)')
        }
      }

      // object config
      if (!isString) {
        try {
         language = CodeMirrorMetas.findModeByName(language.name).mode
        } catch (e) {
         throw new Error('CodeMirror language mode: ' + language.name + ' Configuration error (CodeMirror语言模式配置错误，或者不支持此语言)')
        }
      }

      // console.log(language)
      // require editor language and theme config
      require('codemirror/mode/' + language + '/' + language + '.js')

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
      this.editor.on("gutterClick", function(cm, n) {
        var info = cm.lineInfo(n);
        cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker())
      })
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
      },
      'value': function(newVal, oldVal) {
        const editor_value = this.editor.getValue()
        if (newVal !== editor_value) {
          let scrollInfo = this.editor.getScrollInfo()
          this.editor.setValue(newVal)
          this.content = newVal
          this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
        }
      }
    }
  }
</script>

<style>
  .CodeMirror,
  .CodeMirror pre {
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace!important;
  }
</style>
