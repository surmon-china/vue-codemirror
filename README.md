# vue-codemirror
Codemirror components for Vue.js


# Build Setup

``` bash
# install vue-codemirror
npm install vue-codemirror


# app use
import Vue from 'vue'
...
import CodeMirror from 'vue-codemirror'
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


# [More example](https://github.com/surmon-china/vue-codemirror/blob/master/example/Example.vue)

```

# [More Codemirror Config](http://codemirror.net/doc/manual.html#config)


# example
see dir [example](https://github.com/surmon-china/vue-codemirror/tree/master/example)
