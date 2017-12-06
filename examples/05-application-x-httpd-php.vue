<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>mode: {{ cmOption.mode }}</span>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <span>theme: {{ cmOption.theme }}</span>
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
        <codemirror v-model="code" :options="cmOption"></codemirror>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>

  // language
  import 'codemirror/mode/php/php.js'

  // theme css
  import 'codemirror/theme/cobalt.css'

  // require active-line.js
  import'codemirror/addon/selection/active-line.js'

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
        cmOption: {
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

