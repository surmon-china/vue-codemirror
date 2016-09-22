# vue-codemirror
Codemirror components for Vue.js

<input v-model="code">
<pre>{{ code }}</pre>

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
editorOption = {
  tabSize: 2,
  mode: 'application/json', // htmlmixed || javascript || css ... (default: javascript)
  theme: 'base16-dark' // (default: default)
  lineNumbers: true, // (default: javascript)
  styleActiveLine: true
  line: true,
  ...
}
More [codemirror options](http://codemirror.net/doc/manual.html#config)

# example
see dir [example](https://github.com/surmon-china/vue-codemirror/blob/master/example)

```