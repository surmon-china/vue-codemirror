<template>
  <textarea></textarea>
</template>

<script>
  var CodeMirror = require('codemirror/lib/codemirror.js')
  var CodeMirrorMetas = require('./metas.js')
  require('codemirror/lib/codemirror.css')
  // var 
  export default {
    data: function() {
      return {
        content: ''
      }
    },
    props: {
      code: String,
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
      this.editor.setValue(this.code || this.content)
      this.editor.on('change', function(cm) {
        _this.content = cm.getValue()
        _this.code = cm.getValue()
      })
    },
    mounted: function() {
      var _this = this
      this.editor = CodeMirror.fromTextArea(this.$el, this.options)
      this.editor.setValue(this.code || this.content)
      this.editor.on('change', function(cm) {
        _this.content = cm.getValue()
        if (!!_this.$emit) {
          _this.$emit('changed', _this.content)
        }
      })
    },
    watch: {
      'code': function(newVal, oldVal) {
        const editor_value = this.editor.getValue()
        if (newVal !== editor_value) {
          this.editor.setValue(newVal)
          this.content = newVal
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
