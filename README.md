[![GitHub issues](https://img.shields.io/github/issues/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/network)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/stargazers)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/vue-codemirror.svg?style=flat-square)](https://twitter.com/intent/tweet?url=https://github.com/surmon-china/vue-codemirror)

[![NPM](https://nodei.co/npm/vue-codemirror.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-codemirror/)
[![NPM](https://nodei.co/npm-dl/vue-codemirror.png?months=9&height=3)](https://nodei.co/npm/vue-codemirror/)


# Vue-Codemirror
Codemirror component for Vue.

Build by [Codemirror](http://codemirror.net/).

# Example

[Demo Page](https://surmon-china.github.io/vue-codemirror)

# Update
The latest version of the update, I hope the component itself is a simple and lightweight editor, in addition to the codemirror core library itself, without an other package; of course, it is still can automatically identify the language and theme package, and optimized; if you need other functions, you need to import the corresponding some resources package(with codemirror) in entrance script file or component script.

Most of the native codemirror component built-in event, and converted to a emit Vue event mechanism, if you need more complex event, please on method to get the codemirror component instance object to monitor, the following is a list of the converted event:
- scroll
- changes
- beforeChange
- cursorActivity
- keyHandled
- inputRead
- electricInput
- beforeSelectionChange
- viewportChange
- swapDoc
- gutterClick
- gutterContextMenu
- focus
- blur
- refresh
- optionChange
- scrollCursorIntoView
- update

component event list:
- ready
- change

# Use Setup


### Install vue-codemirror

``` bash
npm install vue-codemirror --save
```

### Vue use

``` javascript
// import
import Vue from 'vue'
import VueCodeMirror from 'vue-codemirror'


// or require
var Vue = require('vue')
var VueCodeMirror = require('vue-codemirror')


// global use
Vue.use(VueCodeMirror)


// if you need to custom new mode
VueCodeMirror.CodeMirror.defineMode('mymode', () => {
  return {
    token(stream, state) {
      if (stream.match("aaa")) {
        return "style1"
      } else if (stream.match("bbb")) {
        return "style2"
      } else {
        stream.next()
        return null
      }
    }
  }
})

// If you need to implement more features, such as the Lint mode code tip, you need to introduce a package that you will be relying on before the Vue program is instantiated, such as:
require('codemirror/addon/selection/active-line.js')
require('codemirror/addon/selection/mark-selection.js')
// require more resource...


// or use with component
import { codemirror, CodeMirror } from 'vue-codemirror'

// custom new mode
CodeMirror.defineMode('mymode', () => {
  // your mode code...
})

export default {
  components: {
    codemirror
  }
}
```


### Use in component

``` vue
<template>
  <!-- Bidirectional data binding（双向数据绑定） -->
  <codemirror v-model="code" :options="editorOptions"></codemirror>

  <!-- or to manually control the datasynchronization（或者手动控制数据流，需要像这样手动监听changed事件） -->
  <codemirror ref="myEditor"
              :code="code" 
              :options="editorOptions"
              @ready="onEditorReady"
              @focus="onEditorFocus"
              @change="onEditorCodeChange">
  </codemirror>
</template>

<script>
// Similarly, you can also introduce the resource pack you want to use within the component
// require('codemirror/some-resource')
export default {
  data () {
    return {
      code: 'const a = 10',
      editorOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,

        // 高级配置（需要引入对应的插件包）,codemirror advanced options(You need to manually introduce the corresponding codemirror function script code)
        // sublime、emacs、vim三种键位模式，支持你的不同操作习惯
        keyMap: "sublime",
        // 按键映射，比如Ctrl键映射autocomplete，autocomplete是hint代码提示事件
        extraKeys: { "Ctrl": "autocomplete" },
        // 代码折叠
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        // 选中文本自动高亮，及高亮方式
        styleSelectedText: true,
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        // more codemirror options...
        // 如果有hint方面的配置，也应该出现在这里
      }
    }
  },
  methods: {
    onEditorReady(editor) {
      console.log('the editor is readied!', editor)
    },
    onEditorFocus(editor) {
      console.log('the editor is focus!', editor)
    },
    onEditorCodeChange(newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
    }
  },
  computed: {
    editor() {
      return this.$refs.myEditor.editor
    }
  },
  mounted() {
    console.log('this is current editor object', this.editor)
    // you can use this.editor to do something...
  }
}
</script>
```

### Editor options mode types:
编辑器的模式（mode属性）分为 字符串、对象两种方式，可以在下面的相关链接中找到语言列表
mode: 'string' || object

``` javascript
// string mode（MIME types/字符串方式）
mode: 'text/javascript'

// or object mode（对象方式）
mode: {
  // name
  name: 'javascript',
  json: true,

  // or ext
  ext: 'js',

  // or mime
  mime: 'text/javascript',

  // or filename
  filename: 'index.js'
}
```

# More options

- [Example Code](https://github.com/surmon-china/vue-codemirror/tree/master/examples)
- [Codemirror config APIs](http://codemirror.net/doc/manual.html#config)
- [Codemirror themes](http://codemirror.net/demo/theme.html)
- [Codemirror language modes](http://codemirror.net/mode/) (MIME types defined)
- [Codemirror events](https://codemirror.net/doc/manual.html#events)


# Author Blog
[Surmon](https://surmon.me)
