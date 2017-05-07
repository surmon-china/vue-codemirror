<template>
  <md-card>
    <md-card-actions v-md-ink-ripple>
      <div class="md-subhead">
        <span>mode: {{ editorOption.mode }}</span>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <span>theme: {{ editorOption.theme }}</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/05-application-x-httpd-php.vue">
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
`<?php
  $a = array('a' => 1, 'b' => 2, 3 => 'c');

  echo "$a[a] \${a[3] /* } comment */} {$a[b]} $a[a]";

  function hello($who) {
    return "Hello $who!";
  }
?>
<p>The program says <?= hello("World") ?>.</p>`
      return {
        code,
        editorOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          mode: 'application/x-httpd-php',
          lineWrapping: true,
          theme: 'cobalt'
        }
      }
    }
  }
</script>

