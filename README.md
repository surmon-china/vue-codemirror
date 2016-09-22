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


# component config
<codemirror :code.sync="code" :options="editorOption"></codemirror>

data () {
  return {
    editorOption: {
      tabSize: 2,
      mode: 'application/json',
      theme: 'base16-dark',
      lineNumbers: true, 
      line: true,
      ...
    }
  }
}

```

More [codemirror options](http://codemirror.net/doc/manual.html#config)


# example
see dir [example](https://github.com/surmon-china/vue-codemirror/tree/master/example)
