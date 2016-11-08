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
        content: '',
        unseenLines: []
      }
    },
    props: {
      code: String,
      value: String,
      markerLine: {
        type: Array,
        default: function () {
          return []
        }
      },
      marker: {
        type: Function,
        default: function () {
          var marker = document.createElement('div')
          marker.style.color = '#822'
          marker.innerHTML = '●'
          return marker
        }
      },
      markerUnseenLines: {
        type: Function,
        default: function () {
          var marker = document.createElement('div')
          marker.style.color = '#FFF'
          marker.innerHTML = '●'
          return marker
        }
      },
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
      this.editor.on('change', function(cm, changeObj) {
        _this.content = cm.getValue()
        if (!!_this.$emit) {
          _this.$emit('changed', _this.content)
          _this.$emit('input', _this.content)
        }
      })
      this.editor.on("gutterClick", function(cm, n) {
        _this.gutterMarkersByClicked(n)
      })
    },
    watch: {
      'code': function(newVal, oldVal) {
        const editor_value = this.editor.getValue()
        console.log(editor_value)
        if (newVal !== editor_value) {
          let scrollInfo = this.editor.getScrollInfo()
          this.editor.setValue(newVal)
          this.content = newVal
          this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
        }
      },
      'value': function(newVal, oldVal) {
        this.unseenLines = []
        const editor_value = this.editor.getValue()
        if (newVal !== editor_value) {
          let scrollInfo = this.editor.getScrollInfo()
          this.editor.setValue(newVal)
          this.content = newVal
          this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
        }
        let newValSplitByLine = newVal.split('\n')
        let oldValSplitByLine = oldVal.split('\n')
        newValSplitByLine.forEach((lineText,index) => {
        console.log(newValSplitByLine[index])
        console.log(oldValSplitByLine[index])
          if(!oldValSplitByLine[index]){
            this.unseenLines.push(index)
          }else if(newValSplitByLine[index] !== oldValSplitByLine[index]){
            this.unseenLines.push(index)
            oldValSplitByLine.splice(index+1, 0, newValSplitByLine[index+1]);
          }
        })
        if(this.options.markEditLine){
          this.gutterMarkers()
        }
      }

    },
    methods: {
      gutterMarkers: function () {
        var _this = this
        console.log(this.unseenLines)
        _this.unseenLines.forEach(line => {
          var info = _this.editor.lineInfo(line)
          _this.editor.setGutterMarker(line, "breakpoints",  _this.markerUnseenLines())
        })
      },
      gutterMarkersByClicked: function (line) {
        var info = this.editor.lineInfo(line)
        this.editor.setGutterMarker(line, "breakpoints",  info.gutterMarkers ? null : this.marker())
      }
    }
  }
</script>

<style>
  .CodeMirror,
  .CodeMirror pre {
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace!important;
    padding: 0 20px !important;
  }
</style>
