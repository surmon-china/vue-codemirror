/*
*
* 主程序模块
*
*/

// Libs
import Vue from 'vue'

// App
import App from './App.vue'

// component
import Example from './Example.vue'

// common component
import CodeMirror from 'vue-codemirror'

// use
Vue.use(CodeMirror)

// router
const router = new Router({
  history: true,
  saveScrollPosition: false,
  transitionOnLoad: true
})

// routerMap
router.map({
  '/': {
    name: 'example',
    component: Example
  }
})

// routerRedirect
router.redirect({
  '*': '/'
})

// Start
router.start(App, 'app')

