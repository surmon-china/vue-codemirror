[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/stargazers)
[![Build Status](https://travis-ci.org/surmon-china/vue-codemirror.svg?branch=master)](https://travis-ci.org/surmon-china/vue-codemirror)
[![GitHub issues](https://img.shields.io/github/issues/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/vue-codemirror.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/surmon-china/vue-codemirror)

[![NPM](https://nodei.co/npm/vue-codemirror.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-codemirror/)
[![NPM](https://nodei.co/npm-dl/vue-codemirror.png?months=9&height=3)](https://nodei.co/npm/vue-codemirror/)


## vue-codemirror
[CodeMirror](http://codemirror.net/) component for Vue.

基于 [CodeMirror](http://codemirror.net/)，适用于 Vue 的 Web 代码编辑器。

### Example

- [Demo Page](https://surmon-china.github.io/vue-codemirror)
- [CDN Example](https://jsfiddle.net/surmon/cp01hvq2/)
- [Nuxt.js/SSR example code](https://github.com/surmon-china/surmon-china.github.io/tree/source/projects/vue-codemirror/nuxt)

### Events

To make it easier to handle events, the component converts some codemirror built-in native events into a single vue component event, where you can listen for events from both the component itself and from codemirror. If you need to listen for more and more complex events, you can pass in the event names (Array) you need for the global `Vue.use(, { events: [] })` and the component parameters `:events`, respectively, or by the `this.codemirror.on(event, hanger)` method of the codemirror instance. Here's a list of events:

**codemirror event list:**
- `scroll`
- `changes`
- `beforeChange`
- `cursorActivity`
- `keyHandled`
- `inputRead`
- `electricInput`
- `beforeSelectionChange`
- `viewportChange`
- `swapDoc`
- `gutterClick`
- `gutterContextMenu`
- `focus`
- `blur`
- `refresh`
- `optionChange`
- `scrollCursorIntoView`
- `update`

**component event list:**
- `ready`
- `input`


### Install

**NPM**

``` bash
npm install vue-codemirror --save

# or
yarn add vue-codemirror
```

**CDN**

``` html
<link rel="stylesheet" href="path/to/codemirror/lib/codemirror.css">
<script type="text/javascript" src="path/to/codemirror.js"></script>
<script type="text/javascript" src="path/to/vue.min.js"></script>
<script type="text/javascript" src="path/to/dist/vue-codemirror.js"></script>
<script type="text/javascript" src="path/to/codemirror/{some-resources}"></script>
<script type="text/javascript">
  Vue.use(window.VueCodemirror)
</script>
```

### Mount

**mount with global**

``` javascript
import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'

// import base style
import 'codemirror/lib/codemirror.css'

// import more codemirror resource...

// you can set default global options and events when Vue.use
Vue.use(VueCodemirror, /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)
```

**mount with component**

```javascript
import { codemirror } from 'vue-codemirror'

// import base style
import 'codemirror/lib/codemirror.css'

// import more codemirror resource...

export default {
  components: {
    codemirror
  }
}
```

### Component

```vue
<template>
  <!-- Two-way Data-Binding -->
  <codemirror v-model="code" :options="cmOptions" />

  <!-- Or manually control the data synchronization -->
  <codemirror
    ref="cmEditor"
    :value="code"
    :options="cmOptions"
    @ready="onCmReady"
    @focus="onCmFocus"
    @input="onCmCodeChange"
  />

  <!-- Nuxt.js -->
  <client-only placeholder="Codemirror Loading...">
    <codemirror
      ref="cmEditor"
      :value="code" 
      :options="cmOptions"
      @ready="onCmReady"
      @focus="onCmFocus"
      @input="onCmCodeChange"
    />
  </client-only>
</template>

<script>
// import language js
import 'codemirror/mode/javascript/javascript.js'

// import theme style
import 'codemirror/theme/base16-dark.css'

// import more 'codemirror/some-resource...'

export default {
  data () {
    return {
      code: 'const a = 10',
      cmOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        // more CodeMirror options...
      }
    }
  },
  methods: {
    onCmReady(cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      console.log('the editor is focused!', cm)
    },
    onCmCodeChange(newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
    }
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror
    }
  },
  mounted() {
    console.log('the current CodeMirror instance object:', this.codemirror)
    // you can use this.codemirror to do something...
  }
}
</script>
```

### CodeMirror Merge

```vue
<template>
  <codemirror :merge="true" :options="cmOption" @scroll="onCmScroll" />
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

### Defined CodeMirror mode

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

// Vue app...
```

### CodeMirror language mode types

Codemirror language mode have [string | object](https://codemirror.net/doc/manual.html#option_mode) types.

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

### CodeMirror

- [CodeMirror language modes](http://codemirror.net/mode/) (MIME types defined)
- [CodeMirror Autoresize](https://codemirror.net/demo/resize.html)
- [CodeMirror themes](http://codemirror.net/demo/theme.html)
- [CodeMirror events](https://codemirror.net/doc/manual.html#events)
- [CodeMirror APIs](http://codemirror.net/doc/manual.html#config)
