[![GitHub issues](https://img.shields.io/github/issues/surmon-china/vue-codemirror.svg)](https://github.com/surmon-china/vue-codemirror/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/vue-codemirror.svg)](https://github.com/surmon-china/vue-codemirror/network)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-codemirror.svg)](https://github.com/surmon-china/vue-codemirror/stargazers)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/vue-codemirror.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

[![NPM](https://nodei.co/npm/vue-codemirror.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-codemirror/)


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
Vue.use(CodeMirror)


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

[More example](https://github.com/surmon-china/vue-codemirror/tree/master/example)


[More Codemirror Config](http://codemirror.net/doc/manual.html#config)


# Author Blog
[Surmon](http://surmon.me)
