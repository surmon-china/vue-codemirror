/**
 * Vue-CodeMirror
 * @author Surmon.me
 * @date 2016-9-22
 */

var CmComponent = require('./codemirror.vue')

var codemirror = {
  install: function(Vue) {
    Vue.component('codemirror', CmComponent)
  }
}

module.exports = codemirror