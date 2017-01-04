[![GitHub issues](https://img.shields.io/github/issues/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/network)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/stargazers)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/vue-codemirror.svg?style=flat-square)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

[![NPM](https://nodei.co/npm/vue-codemirror.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-codemirror/)


# Vue-Codemirror
Codemirror component for Vue.js(1.x ~ 2.x)，组件基于 [Codemirror](http://codemirror.net/)构建，支持Vue目前全部版本，支持100+多种语言、分支语言、语法，支持多种代码高亮theme，并可以自行配置；可使用Vue-Codemirror快速轻易构建出多种丰富全面的web code editor，并以此基础多次开发WebIDE。

> ### V2.1.6
> 修复自定义mode的功能

> ### V2.1.5
> 增加代码补全提示、选中高亮、整行高亮、（sublime、emacs、vim）三种键位模式、代码块折叠、vue编码的支持...

> ### V2.1.3
> 重构example页面，优化释放方法，修复部分小问题

> ### V2.1.2
> add unseen line marker


# Example

[Demo Page](https://surmon-china.github.io/vue-codemirror)


# Use Setup


### Install vue-codemirror

``` bash
npm install vue-codemirror --save
```

### Vue use

``` javascript
// import in ES6
import Vue from 'vue'
import VueCodeMirror from 'vue-codemirror'


// require in Webpack/Node.js
var Vue = require('vue')
var VueCodeMirror = require('vue-codemirror')


// use
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


// --------------------------------------


// or use with component(ES6)
import Vue from 'vue'
import { codemirror, CodeMirror } from 'vue-codemirror'

// if you need to custom new mode
CodeMirror.defineMode('mymode', () => {
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

// use in component
export default {
  components: {
    codemirror
  }
}
```


### Use in components

``` html
<!-- 基础使用 -->
<codemirror></codemirror>


<!-- use in vue1.0（Vue1中应用） -->

<!-- component data bind and config（基础配置/父->子单向数据流） -->
<codemirror :code="code" :options="editorOption"></codemirror>
<!-- Bidirectional data binding（双向数据绑定） -->
<codemirror :code.sync="code" :options="editorOption"></codemirror>
<!-- 也可以这样简约配置 -->
<codemirror :code.sync="code" :options="{ tabSize: 2, mode: 'text/css' }"></codemirror>


<!-- use in vue2.0（Vue2中应用） -->

<!-- component data bind and config（基础配置/父->子单向数据流） -->
<codemirror :code="code" :options="editorOption"></codemirror>
<!-- Bidirectional data binding（双向数据绑定） -->
<codemirror v-model="code" :options="editorOption"></codemirror>
<!-- If you need to manually control the data synchronization, you can monitor the code change event like this（如果你需要手动控制数据流，就需要像这样手动监听changed事件） -->
<codemirror :code="code" :options="editorOption" @changed="codeChange"></codemirror>

<!-- 如果需要代码提示功能，要在组件传入hint属性为true，如果需要在后续获取codemirror对象做什么事，应该在这里定义一个ref属性 -->
<codemirror v-model="code" :options="editorOption" :hint="true" ref="myEditor"></codemirror>
```


``` javascript
// editor option example:
export default {
  data () {
    return {
      code: 'const a = 10',
      editorOption: {
        // 下面所有配置同Codemirror配置，均为可选
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
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
        // more codemirror config...
        // 如果有hint方面的配置，也应该出现在这里
      }
    }
  },
  // If you need to manually control the data synchronization, parent component needs to explicitly emit an event instead of relying on implicit binding
  // 在2.0中如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    codeChange(newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
    }
  },
  // example code (if you need to get the current editor object, you can find the editor object like this, the $ref object is a ref attribute corresponding to the dom redefined)
  // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
  computed: {
    editor() {
      return this.$refs.myEditor.editor
    }
  },
  mounted() {
    // you can use current editor object to do something(editor methods)
    // 然后你就可以使用当前上下文内的editor对象去做你想做的事了
    console.log('this is current editor object', this.editor)
    // this.editor to do something...
  }
}

// editor options mode types:
// 编辑器的模式（mode属性）分为 字符串、对象两种方式，可以在下面的相关链接中找到语言列表

// string mode（MIME types/字符串方式）
mode: 'text/javascript'

// object mode（对象方式）
mode: {
  name: 'javascript',
  json: true
}
```


# More Config

[Code example](https://github.com/surmon-china/vue-codemirror/tree/master/example)

[Codemirror config APIs](http://codemirror.net/doc/manual.html#config)

[Codemirror themes](http://codemirror.net/demo/theme.html)

[Codemirror language modes](http://codemirror.net/mode/) (MIME types defined)



# Author Blog
[Surmon](http://surmon.me)
