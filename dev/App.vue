<script setup lang="ts">
  import { reactive, shallowRef, computed, onMounted } from 'vue'
  import { javascript } from '@codemirror/lang-javascript'
  import { html } from '@codemirror/lang-html'
  import { json } from '@codemirror/lang-json'
  import { markdown } from '@codemirror/lang-markdown'
  import { oneDark } from '@codemirror/theme-one-dark'
  import { Codemirror } from '../src'

  const themes: any = { oneDark }
  const languages: any = {
    javascript: javascript(),
    html: html(),
    json: json(),
    markdown: markdown()
  }

  const consoleLog = console.log
  const code = shallowRef(`console.log('Hello World')`)
  const view = shallowRef()
  const config = reactive({
    disabled: false,
    indentWithTab: true,
    tabSize: 4,
    autofocus: true,
    placeholder: 'input...',
    backgroundColor: 'red',
    language: 'javascript',
    theme: 'oneDark',
    phrases: 'en-us'
  })

  const handleReady = (payload: any) => {
    console.log('handleReady payload:', payload)
  }

  const extensions = computed(() => {
    const result = []
    result.push(languages[config.language])
    if (themes[config.theme]) {
      result.push(themes[config.theme])
    }
    return result
  })

  onMounted(() => {
    console.log('mounted view:', view)
  })

  const germanPhrases = {
    // @codemirror/view
    'Control character': 'Steuerzeichen',
    // @codemirror/commands
    'Selection deleted': 'Auswahl gelöscht',
    // @codemirror/language
    'Folded lines': 'Eingeklappte Zeilen',
    'Unfolded lines': 'Ausgeklappte Zeilen',
    to: 'bis',
    'folded code': 'eingeklappter Code',
    unfold: 'ausklappen',
    'Fold line': 'Zeile einklappen',
    'Unfold line': 'Zeile ausklappen',
    // @codemirror/search
    'Go to line': 'Springe zu Zeile',
    go: 'OK',
    Find: 'Suchen',
    Replace: 'Ersetzen',
    next: 'nächste',
    previous: 'vorherige',
    all: 'alle',
    'match case': 'groß/klein beachten',
    'by word': 'ganze Wörter',
    replace: 'ersetzen',
    'replace all': 'alle ersetzen',
    close: 'schließen',
    'current match': 'aktueller Treffer',
    'replaced $ matches': '$ Treffer ersetzt',
    'replaced match on line $': 'Treffer on Zeile $ ersetzt',
    'on line': 'auf Zeile',
    // @codemirror/autocomplete
    Completions: 'Vervollständigungen',
    // @codemirror/lint
    Diagnostics: 'Diagnosen',
    'No diagnostics': 'Keine Diagnosen'
  }
</script>

<template>
  <div class="example">
    <div class="toolbar">
      <pre class="state">{{ config }}</pre>
      <div class="config">
        <p>
          <button @click="config.disabled = !config.disabled">toggle disabled</button>
        </p>
        <p>
          <button @click="config.autofocus = !config.autofocus">toggle autofocus</button>
        </p>
        <p>
          <button @click="config.indentWithTab = !config.indentWithTab">toggle indentWithTab</button>
        </p>
        <p>
          <label for="tabSize">tabSize:</label>
          <input type="range" id="tabSize" min="2" max="10" step="2" v-model.number="config.tabSize" />
        </p>
        <p>
          <label for="backgroundColor">backgroundColor:</label>
          <select name="backgroundColor" id="backgroundColor" v-model="config.backgroundColor">
            <option
              :value="option"
              :key="option"
              v-for="option in ['red', 'black', 'yellow', 'lawngreen', 'blue']"
            >
              {{ option }}
            </option>
          </select>
        </p>
        <p>
          <label for="language">language:</label>
          <select name="language" id="language" v-model="config.language">
            <option
              :value="option"
              :key="option"
              v-for="option in ['javascript', 'html', 'json', 'markdown']"
            >
              {{ option }}
            </option>
          </select>
        </p>
        <p>
          <label for="theme">theme:</label>
          <select name="theme" id="theme" v-model="config.theme">
            <option :value="option" :key="option" v-for="option in ['default', 'oneDark']">
              {{ option }}
            </option>
          </select>
        </p>
        <p>
          <label for="phrases">phrases:</label>
          <select name="phrases" id="phrases" v-model="config.phrases">
            <option :value="option" :key="option" v-for="option in ['en-us', 'de-de']">
              {{ option }}
            </option>
          </select>
        </p>
      </div>
    </div>
    <div class="content">
      <pre class="code">{{ code }}</pre>
      <codemirror
        class="codemirror"
        ref="cm"
        :autofocus="config.autofocus"
        :placeholder="config.placeholder"
        :indentWithTab="config.indentWithTab"
        :tabSize="config.tabSize"
        :disabled="config.disabled"
        :style="{ backgroundColor: config.backgroundColor }"
        :extensions="extensions"
        :phrases="config.phrases === 'en-us' ? {} : germanPhrases"
        v-model="code"
        @ready="handleReady"
        @change="consoleLog('change', $event)"
        @focus="consoleLog('focus', $event)"
        @blur="consoleLog('blur', $event)"
      />
    </div>
  </div>
</template>

<style lang="scss">
  body {
    margin: 0;
  }

  .example {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .toolbar {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      .state {
        margin: 2rem 0;
        margin-right: 2rem;
        padding: 2em;
        border: 1px solid #ccc;
      }
    }

    .content {
      display: flex;
      width: 100%;
      justify-content: center;

      .code {
        overflow: scroll;
      }

      .code,
      .codemirror .cm-editor {
        width: 30vw;
        height: 50vh;
        margin: 0 1rem;
        border: 1px solid #ddd;
      }
    }
  }
</style>
