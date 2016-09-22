/**
 * Vue-CodeMirror
 * @author Surmon.me
 * @date 2016-9-22
 */

'use strict'
import CodeMirror from 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css'

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
        default: () => {
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
      // console.log('created', this, this.$el, this.options)
      this.options    = this.options || {}
      const language  = this.options.mode || 'javascript'
      const theme     = this.options.theme
      require('codemirror/mode/' + language + '/' + language + '.js')
      if (!!theme && theme != 'default') require('codemirror/theme/' + theme + '.css')
    },
    ready () {
      // console.log(this, this.code)
      this.editor = CodeMirror.fromTextArea(this.$el, this.options)
      this.editor.setValue(this.code || this.content)
      this.editor.on('change', cm => {
        this.content = cm.getValue()
        this.code = cm.getValue()
        // console.log(this)
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

const codemirror = {
  install (Vue) {
    CmComponentBuild(Vue)
  }
};

module.exports = codemirror;