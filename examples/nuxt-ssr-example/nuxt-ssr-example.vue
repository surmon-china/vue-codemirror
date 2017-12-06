<template>
  <section class="container">
    <no-ssr placeholder="Codemirror Loading...">
      <codemirror v-model="code" 
                  :options="cmOption"
                  @cursorActivity="onCmCursorActivity"
                  @ready="onCmReady"
                  @focus="onCmFocus"
                  @blur="onCmBlur">
      </codemirror>
    </no-ssr>
  </section>
</template>

<script>
  export default {
    data() {
      const code =
`<template>
  <h1>Hello World!</h1>
  <codemirror v-model="code" :options="cmOption"></codemirror>
</template>

<script>
  // import 'some-codemirror-resource'
  export default {
    data() {
      return {
        code: 'const A = 10',
        cmOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          foldGutter: true,
          styleSelectedText: true,
          mode: 'text/javascript',
          keyMap: "sublime",
          matchBrackets: true,
          showCursorWhenSelecting: true,
          theme: "monokai",
          extraKeys: { "Ctrl": "autocomplete" },
          hintOptions:{
            completeSingle: false
          }
        }
      }
    }
  }
<\/script>

<style lang="scss">
  @import './sass/mixins';
  @import './sass/variables';
  main {
    position: relative;
  }
</style>`
      return {
        code,
        cmOption: {
          tabSize: 4,
          foldGutter: true,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          keyMap: "sublime",
          mode: 'text/x-vue',
          theme: 'base16-dark',
          extraKeys: {
            'F11'(cm) {
              cm.setOption("fullScreen", !cm.getOption("fullScreen"))
            },
            'Esc'(cm) {
              if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false)
            }
          }
        }
      }
    },
    methods: {
      onCmCursorActivity(codemirror) {
        console.log('onCmCursorActivity', codemirror)
      },
      onCmReady(codemirror) {
        console.log('onCmReady', codemirror)
      },
      onCmFocus(codemirror) {
        console.log('onCmFocus', codemirror)
      },
      onCmBlur(codemirror) {
        console.log('onCmBlur', codemirror)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 60%;
    margin: 0 auto;
    padding: 50px 0;
    text-align: left;
  }
</style>
