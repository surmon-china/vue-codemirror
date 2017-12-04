
/*
* Vue-CodeMirror ssr.js
* Author: surmon@foxmail.com
* Github: https://github.com/surmon-china/vue-codemirror
*/

window.CodeMirror = require('codemirror/lib/codemirror.js')
var CmComponent = require('./src/codemirror.vue')
CmComponent = CmComponent.default || CmComponent

var Codemirror = {
  CodeMirror: CodeMirror,
  codemirror: CmComponent,
  install: function(Vue) {
    Vue.component(CmComponent.name, CmComponent)
  }
}

module.exports = Codemirror
