[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/stargazers)
[![Build Status](https://travis-ci.org/surmon-china/vue-codemirror.svg?branch=master)](https://travis-ci.org/surmon-china/vue-codemirror)
[![GitHub issues](https://img.shields.io/github/issues/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/vue-codemirror.svg?style=flat-square)](https://twitter.com/intent/tweet?url=https://github.com/surmon-china/vue-codemirror)

[![NPM](https://nodei.co/npm/vue-codemirror.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-codemirror/)
[![NPM](https://nodei.co/npm-dl/vue-codemirror.png?months=9&height=3)](https://nodei.co/npm/vue-codemirror/)


# Vue-Codemirror
[Codemirror](http://codemirror.net/) component for Vue.

基于 [Codemirror](http://codemirror.net/)，适用于 Vue 的 Web 代码编辑器。

# Example

[Demo Page](https://surmon-china.github.io/vue-codemirror)

[CDN Example](https://jsfiddle.net/u1f16q85/)

[Nuxt.js/SSR example code](https://github.com/surmon-china/vue-codemirror/blob/master/examples/nuxt-ssr-example)

# Events

To make it easier to handle events, the component converts some codemirror built-in native events into a single vue component event, where you can listen for events from both the component itself and from codemirror. If you need to listen for more and more complex events, you can pass in the event names (Array) you need for the global `Vue.use(, { events: [] })` and the component parameters `:events`, respectively, or by the `this.codemirror.on(event, hanger)` method of the codemirror instance. Here's a list of events:

**codemirror events list:**
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

**component events list:**
- ready
- input


# Install

#### CDN

``` html
<link rel="stylesheet" href="path/to/codemirror/lib/codemirror.css">
<script type="text/javascript" src="path/to/codemirror.js"></script>
<script type="text/javascript" src="path/to/vue.min.js"></script>
<script type="text/javascript" src="path/to/dist/vue-codemirror.js"></script>
<script type="text/javascript" src="path/to/codemirror/some-resources.js"></script>
<script type="text/javascript">
  Vue.use(window.VueCodemirror)
</script>
```

#### NPM

``` bash
npm install vue-codemirror --save
```

### Mount

#### mount with global

``` javascript
// require lib
import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'

// require styles
import 'codemirror/lib/codemirror.css'

// require more codemirror resource...

// you can set default global options and events when use
Vue.use(VueCodemirror, /* { 
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)
```

#### mount with component

```javascript
// require component
import { codemirror } from 'vue-codemirror'

// require styles
import 'codemirror/lib/codemirror.css'

// require more codemirror resource...

// component
export default {
  components: {
    codemirror
  }
}
```

#### mount with ssr

```javascript
// If used in nuxt.js/ssr, you should keep it only in browser build environment
if (process.browser) {
  const VueCodemirror = require('vue-codemirror')
  Vue.use(VueCodemirror)
}
```

#### defined codemirror mode

```javascript
import CodeMirror from 'codemirror'
CodeMirror.defineMode('mymode', () => {
  return {
    token(stream, state) {
      if (stream.match("const")) {
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
```

### Component

```vue
<template>
  <!-- bidirectional data binding（双向数据绑定） -->
  <codemirror v-model="code" :options="cmOptions"></codemirror>

  <!-- or to manually control the datasynchronization（或者手动控制数据流，需要像这样手动监听changed事件） -->
  <codemirror ref="myCm"
              :value="code" 
              :options="cmOptions"
              @ready="onCmReady"
              @focus="onCmFocus"
              @input="onCmCodeChange">
  </codemirror>

  <!-- if Nust.js/SSR（如果在 Nuxt.js 环境下，需要外面包裹一层 no-ssr） -->
  <no-ssr placeholder="Codemirror Loading...">
    <codemirror ref="myCm"
                :value="code" 
                :options="cmOptions"
                @ready="onCmReady"
                @focus="onCmFocus"
                @input="onCmCodeChange">
    </codemirror>
  </no-ssr>
</template>

<script>
// language js
import 'codemirror/mode/javascript/javascript.js'
// theme css
import 'codemirror/theme/base16-dark.css'
// more codemirror resources
// import 'codemirror/some-resource...'
export default {
  data () {
    return {
      code: 'const a = 10',
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    }
  },
  methods: {
    onCmReady(cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      console.log('the editor is focus!', cm)
    },
    onCmCodeChange(newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
  mounted() {
    console.log('this is current codemirror object', this.codemirror)
    // you can use this.codemirror to do something...
  }
}
</script>
```


### Codemirror Merge


```vue
<template>
  <codemirror :merge="true" :options="cmOption" @scroll="onCmScroll"></codemirror>
</template>

<script>
  // merge js
  import 'codemirror/addon/merge/merge.js'
  // merge css
  import 'codemirror/addon/merge/merge.css'
  // google DiffMatchPatch
  import DiffMatchPatch from 'diff-match-patch'
  // DiffMatchPatch config with global
  window.diff_match_patch = DiffMatchPatch
  window.DIFF_DELETE = -1
  window.DIFF_INSERT = 1
  window.DIFF_EQUAL = 0
  export default {
    data() {
      return {
        cmOption: {
          value: '<p>hello</p>',
          origLeft: null,
          orig: '<p>hello world</p>',
          connect: 'align',
          mode: 'text/html',
          lineNumbers: true,
          collapseIdentical: false,
          highlightDifferences: true
        }
      }
    },
    methods: {
      onCmScroll() {
        console.log('onCmScroll')
      }
    }
  }
</script>
```


### Codemirror language mode types
编辑器的模式（mode属性）分为 字符串、对象两种方式，Codemirror 官方文档有说明

`mode: 'string' || object`

``` javascript
// MIME types
mode: 'text/javascript'

// name
mode: {
  name: 'javascript',
  json: true
}

// ext
mode: {
  ext: 'js'
}

// mime
mode: {
  mime: 'text/javascript'
}

// filename
mode: {
  filename: 'index.js'
}
```

# CodeMirror

- [CodeMirror language modes](http://codemirror.net/mode/) (MIME types defined)
- [CodeMirror Autoresize](https://codemirror.net/demo/resize.html)
- [CodeMirror themes](http://codemirror.net/demo/theme.html)
- [CodeMirror events](https://codemirror.net/doc/manual.html#events)
- [CodeMirror APIs](http://codemirror.net/doc/manual.html#config)


# Author
[Surmon](https://surmon.me)
