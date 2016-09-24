/**
 * Vue-CodeMirror
 * @author Surmon.me
 * @date 2016-9-22
 */

'use strict'
const CodeMirror = require('codemirror/lib/codemirror.js')
require('codemirror/lib/codemirror.css')

const CmComponentBuild = Vue => {
  const CmComponent = Vue.extend({
    template: `<textarea></textarea>`,
    data () {
      return {
        content: ''
      }
    },
    props: { 
      code: String,
      options: {
        type: Object,
        default () {
          return {
            styleActiveLine: true,
            lineNumbers: true,
            mode: 'javascript',
            lineWrapping: true
          }
        }
      },
    },
    created () {
      this.options    = this.options || {}
      const language  = this.options.mode || 'javascript'
      const theme     = this.options.theme
      require('codemirror/mode/' + language + '/' + language + '.js')
      if (!!theme && theme != 'default') require('codemirror/theme/' + theme + '.css')
    },
    ready () {
      this.editor = CodeMirror.fromTextArea(this.$el, this.options)
      this.editor.setValue(this.code || this.content)
      this.editor.on('change', cm => {
        this.content = cm.getValue()
        this.code = cm.getValue()
      })
    },
    watch: {
      'code': (newVal, oldVal) => {
        // console.log('update', newVal)
        // this.editor.setValue(newVal)
        // this.content = newVal
      }
    }
  })
  Vue.component('codemirror', CmComponent)
}

const codemirror = {
  install (Vue) {
    CmComponentBuild(Vue)
  }
}

module.exports = codemirror