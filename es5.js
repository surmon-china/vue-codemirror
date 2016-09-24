/**
 * Vue-CodeMirror ES5
 * @author Surmon.me
 * @date 2016-9-22
 */

'use strict'
var CodeMirror = require('codemirror/lib/codemirror.js')
require('codemirror/lib/codemirror.css')

var CmComponentBuild = function(Vue) {
  var CmComponent = Vue.extend({
    template: '<textarea></textarea>',
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
            mode: 'javascript',
            lineWrapping: true
          }
        }
      },
    },
    created: function() {
      this.options    = this.options || {}
      var language  = this.options.mode || 'javascript'
      var theme     = this.options.theme
      require('codemirror/mode/' + language + '/' + language + '.js')
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
    watch: {
      'code': function(newVal, oldVal) {
        // console.log('update', newVal)
        // this.editor.setValue(newVal)
        // this.content = newVal
      }
    }
  })
  Vue.component('codemirror', CmComponent)
}

var codemirror = {
  install: function(Vue) {
    CmComponentBuild(Vue)
  }
}

module.exports = codemirror