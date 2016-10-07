/**
 * Vue-CodeMirror
 * @author Surmon.me
 */

var CmComponent = require('./codemirror.vue')
var Codemirror = {
  codemirror: CmComponent,
  install: function(Vue) {
    Vue.component('codemirror', CmComponent)
  }
}

module.exports = Codemirror