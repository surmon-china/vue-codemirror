[![GitHub issues](https://img.shields.io/github/issues/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/network)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/stargazers)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/vue-codemirror.svg?style=flat-square)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

[![NPM](https://nodei.co/npm/vue-codemirror.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-codemirror/)


# Vue-Codemirror
Codemirror component for Vue.js(1.x ~ 2.x)，本组件基于 [Codemirror](http://codemirror.net/)构建，支持Vue全版本使用，支持100+多种语言、分支语言、语法，支持多种代码高亮theme，并可以自行配置，可使用Vue-Codemirror快速轻易构建出多种丰富全面的web code editor，并以此基础多次开发WebIDE，欢迎加入前端技术交流群：288325802



# Example

[Demo Page](https://surmon-china.github.io/vue-codemirror)


# Use Setup


### Install vue-codemirror

``` bash
npm install vue-codemirror --save
```

### Vue use

``` javascript
// import with ES6
import Vue from 'vue'
// ...
import CodeMirror from 'vue-codemirror'


// require with Webpack/Node.js
var Vue = require('vue')
// ...
var CodeMirror = require('vue-codemirror')


// use
Vue.use(CodeMirror)


// --------------------------------------


// or use with component(ES6)
import Vue from 'vue'
// ...
import { codemirror } from 'vue-codemirror'

// use
export default {
  components: {
    codemirror
  }
}
```


### Use in components

``` html
<codemirror></codemirror>


<!-- component data bind(Vue.js1.X) -->
<codemirror :code.sync="code"></codemirror>


<!-- component config example 1(Vue.js1.X) -->
<codemirror :code.sync="code" :options="editorOption"></codemirror>


<!-- in vue.js2.X  .once and .sync are deprecated, parent component needs to explicitly emit an event instead of relying on implicit binding  -->
<codemirror :code="code" :options="editorOption" @changed="codeChange"></codemirror>
```


``` javascript
// editorOption example:
export default {
  data () {
    return {
      code: 'const a = 10',
      editorOption: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true, 
        line: true,
        ...
      }
    }
  },
  // if you use in vue2.X，parent component needs to explicitly emit an event instead of relying on implicit binding
  methods: {
    codeChange(newCode) {
      console.log(newCode)
      this.code = newCode
    }
  }
}

// editorOption mode types:

// string mode
mode: 'text/javascript'

// object mode
mode: {
  name: 'javascript',
  json: true
}
```

``` html
<!-- component config example 2(Vue.js1.X) -->
<codemirror :code.sync="css" :options="{ tabSize: 2, mode: 'css' }"></codemirror>
```

``` javascript
data () {
  return {
    css: '.class { display: block }'
  }
}
```


# More Config

[Code example](https://github.com/surmon-china/vue-codemirror/tree/master/example)

[Codemirror config APIs](http://codemirror.net/doc/manual.html#config)

[Codemirror themes](http://codemirror.net/demo/theme.html)

[Codemirror language modes](http://codemirror.net/mode/)



# Author Blog
[Surmon](http://surmon.me)
