<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>mode: {{ editorOption.mode }}</span>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <span>theme: {{ editorOption.theme }}</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/03-text-css.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="codemirror">
        <!-- codemirror -->
        <codemirror v-model="code" :options="editorOption"></codemirror>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>

  // require active-line.js
  require('codemirror/addon/selection/active-line.js')
  
  export default {
    data() {
const code =
`/* Some example CSS */

@import url("something.css");

body {
  margin: 0;
  padding: 3em 6em;
  font-family: tahoma, arial, sans-serif;
  color: #000;
}

#navigation a {
  font-weight: bold;
  text-decoration: none !important;
}

h1 {
  font-size: 2.5em;
}

h2 {
  font-size: 1.7em;
}

h1:before, h2:before {
  content: "::";
}

code {
  font-family: courier, monospace;
  font-size: 80%;
  color: #418A8A;
}`
      return {
        code,
        editorOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          mode: 'text/css',
          theme: 'paraiso-light'
        }
      }
    }
  }
</script>

