[![GitHub issues](https://img.shields.io/github/issues/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/network)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/stargazers)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/vue-codemirror.svg?style=flat-square)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

[![NPM](https://nodei.co/npm/vue-codemirror.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-codemirror/)


# Vue-Codemirror
Codemirror components for Vue.js


# Example

[Demos](https://surmon-china.github.io/vue-codemirror)


# Use Setup

``` bash
# install vue-codemirror
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
```


### Use in components

``` html
<codemirror></codemirror>


<!-- component data bind -->
<codemirror :code.sync="code"></codemirror>


<!-- component config example 1 -->
<codemirror :code.sync="code" :options="editorOption"></codemirror>
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
<!-- component config example 2 -->
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

[More codemirror configs](http://codemirror.net/doc/manual.html#config)

[More codemirror themes](http://codemirror.net/demo/theme.html)

[More codemirror language modes](http://codemirror.net/mode/)



# Author Blog
[Surmon](http://surmon.me)
