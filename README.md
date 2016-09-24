# vue-codemirror
Codemirror components for Vue.js


# Screenshots

![image](https://raw.githubusercontent.com/surmon-china/vue-codemirror/master/screenshots/example.png)

![image](https://raw.githubusercontent.com/surmon-china/vue-codemirror/master/screenshots/code.png)


# Build Setup

``` bash
# install vue-codemirror
npm install vue-codemirror


# Vue use

## import with ES6
import Vue from 'vue'
...
import CodeMirror from 'vue-codemirror'


## require with Webpack
var Vue = require('vue')
...
var CodeMirror = require('vue-codemirror')

## use
Vue.use(CodeMirror)        // use vue-codemirror es5 (default && recommend)
Vue.use(CodeMirror.es6)    // use vue-codemirror es6 (need babel support)


# use in components
<codemirror></codemirror>


# component data bind
<codemirror :code.sync="code"></codemirror>


# component config example 1
<codemirror :code.sync="code" :options="editorOption"></codemirror>

data () {
  return {
    code: 'const a = 10',
    editorOption: {
      tabSize: 4,
      mode: 'javascript',
      theme: 'base16-dark',
      lineNumbers: true, 
      line: true,
      ...
    }
  }
}


# component config example 2
<codemirror :code.sync="css" :options="{ tabSize: 2, mode: 'css' }"></codemirror>

data () {
  return {
    css: '.class { display: block }'
  }
}

```

## [More example](https://github.com/surmon-china/vue-codemirror/tree/master/example)


## [More Codemirror Config](http://codemirror.net/doc/manual.html#config)


# Author Blog
[Surmon](http://surmon.me)
