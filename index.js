/**
 * Vue-CodeMirror
 * @author Surmon.me
 */

window.CodeMirror = require('codemirror/lib/codemirror.js')
var CmComponent = require('./codemirror.vue')

var Codemirror = {
  CodeMirror: CodeMirror,
  codemirror: CmComponent,
  install: function(Vue) {
    Vue.component('codemirror', CmComponent)
  }
}

module.exports = Codemirror
