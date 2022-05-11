# vue-codemirror

[![vue](https://img.shields.io/badge/MADE%20WITH-VUE-42a97a?style=for-the-badge&labelColor=35495d)](https://vuejs.org)
&nbsp;
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-codemirror.svg?style=for-the-badge)](https://github.com/surmon-china/vue-codemirror/stargazers)
&nbsp;
[![npm](https://img.shields.io/npm/v/vue-codemirror?color=c7343a&label=npm&style=for-the-badge)](https://www.npmjs.com/package/vue-codemirror)
&nbsp;
[![Test Codecov](https://img.shields.io/codecov/c/github/surmon-china/vue-codemirror?style=for-the-badge)](https://codecov.io/gh/surmon-china/vue-codemirror)
&nbsp;
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)](/LICENSE)

[CodeMirror(6)](https://codemirror.net/6/docs/) component for Vue(3).

### Example

- [Examples (Vue3)](https://github.surmon.me/vue-codemirror)
- [Examples (Vue2)](https://v1.github.surmon.me/vue-codemirror)

### Documentation

- [CodeMirror6 guide](https://codemirror.net/6/docs/guide/)
- [CodeMirror6 APIs](https://codemirror.net/6/docs/ref/)
- [CodeMirror6 examples](https://codemirror.net/6/examples/)
- [CodeMirror6 language](https://codemirror.net/6/examples/lang-package/)
- [CodeMirror6 styling](https://codemirror.net/6/examples/styling/)
- [CodeMirror discuss](https://discuss.codemirror.net/)

### Legacy version

- [vue-codemirror@4.0.0 (Vue2 / CodeMirror5)](https://github.com/surmon-china/vue-codemirror/tree/v4.0.0)

### How to use

#### Install

```bash
yarn add vue-codemirror
```

```bash
npm install vue-codemirror --save
```

#### Depending on your actual needs, you may need to install more CodeMirror packages

```base
// CodeMirror languages...
yarn @codemirror/lang-html
yarn @codemirror/lang-json
yarn @codemirror/lang-javascript

// CodeMirror themes...
yarn @codemirror/theme-one-dark

// more CodeMirror packages...
```

#### local component

```vue
<template>
  <codemirror
    class="codemirror"
    :autofocus="true"
    placeholder="input..."
    :indent-with-tab="true"
    :tabSize="2"
    :style="{ height: '400px' }"
    :extensions="extensions"
    v-model="code"
    @ready="log('ready', $event)"
    @change="log('change', $event)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
</template>

<script>
  import { Codemirror } from 'vue-codemirror'
  import { javascript } from '@codemirror/lang-javascript'
  import { oneDark } from '@codemirror/theme-one-dark'

  export default {
    components: {
      Codemirror
    },
    setup() {
      const code = ref(`console.log('Hello, world!')`)
      const extensions = [javascript(), oneDark]

      return {
        code,
        extensions,
        log: console.log
      }
    }
  }
</script>
```

#### global component

```javascript
import { createApp } from 'vue'
import VueCodemirror from 'vue-codemirror'
import { basicSetup } from '@codemirror/basic-setup'

const app = createApp()

app.use(VueCodemirror, {
  // optional default global options
  autofocus: true,
  disabled: false,
  indentWithTab: true,
  tabSize: 2,
  placeholder: 'input...',
  extensions: [basicSetup]
  // ...
})
```

### Component Props

| prop          | description                                               | type                     | default |
| :------------ | :-------------------------------------------------------- | :----------------------- | :------ |
| autofocus     | Focus editor immediately after mounted.                   | `Boolean`                | `false` |
| disabled      | Disable input behavior and disable change state.          | `Boolean`                | `false` |
| indentWithTab | Bind keyboard Tab key event.                              | `Boolean`                | `true`  |
| tabSize       | Specify the indent when the Tab key is pressed.           | `Number`                 | `2`     |
| placeholder   | Display when empty.                                       | `String`                 | `''`    |
| style         | The CSS style object that acts on the CodeMirror itself.  | `Object`                 | `{}`    |
| extensions    | Passed to CodeMirror `EditorState.create({ extensions })` | `Extension`              | `[]`    |
| selection     | Passed to CodeMirror `EditorState.create({ selection })`  | `EditorSelection`        | -       |
| root          | Passed to CodeMirror `new EditorView({ root })`           | `ShadowRoot \| Document` | -       |

### Component Events

| event               | description                                             | params                                                                           |
| :------------------ | :------------------------------------------------------ | :------------------------------------------------------------------------------- |
| `update:modelValue` | **Only** when the CodeMirror content (doc) has changed. | `(value: string, viewUpdate: ViewUpdate)`                                        |
| change              | ditto                                                   | ditto                                                                            |
| update              | When any state of CodeMirror changes.                   | `(viewUpdate: ViewUpdate)`                                                       |
| focus               | When CodeMirror focused.                                | `(viewUpdate: ViewUpdate)`                                                       |
| blur                | When CodeMirror blurred.                                | `(viewUpdate: ViewUpdate)`                                                       |
| ready               | When edirot component mounted.                          | `(payload: { view: EditorView; state: EditorState; container: HTMLDivElement })` |

### Basic Setup

The [basic-setup](https://codemirror.net/6/docs/ref/#basic-setup) extension is integrated by default in the vue-codemirror configuration, and is intended as a handy helper to quickly set up CodeMirror without having to install and import a lot of standalone packages. If you want to override the default behavior of the config, just pass the empty array when installing the component globally.

```js
app.use(VueCodemirror, {
  // keep the global default extensions empty
  extension: []
})
```

### Changelog

Detailed changes for each release are documented in the [release notes](/CHANGELOG.md).

### License

Licensed under the [MIT](/LICENSE) License.
