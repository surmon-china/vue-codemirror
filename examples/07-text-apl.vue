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
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/07-text-apl.vue">
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
  import 'codemirror/mode/apl/apl.js'

  // theme css
  import 'codemirror/theme/paraiso-dark.css'

  // require active-line.js
  import 'codemirror/addon/selection/active-line.js'

  export default {
    data() {
const code =
`
  ⍝ Conway's game of life
  ⍝ This example was inspired by the impressive demo at
  ⍝ http://www.youtube.com/watch?v=a9xAKttWgP4

  ⍝ Create a matrix:
  ⍝     0 1 1
  ⍝     1 1 0
  ⍝     0 1 0
  creature ← (3 3 ⍴ ⍳ 9) ∈ 1 2 3 4 7   ⍝ Original creature from demo
  creature ← (3 3 ⍴ ⍳ 9) ∈ 1 3 6 7 8   ⍝ Glider

  ⍝ Place the creature on a larger board, near the centre
  board ← ¯1 ⊖ ¯2 ⌽ 5 7 ↑ creature

  ⍝ A function to move from one generation to the next
  life ← {∨/ 1 ⍵ ∧ 3 4 = ⊂+/ +⌿ 1 0 ¯1 ∘.⊖ 1 0 ¯1 ⌽¨ ⊂⍵}

  ⍝ Compute n-th generation and format it as a
  ⍝ character matrix
  gen ← {' #'[(life ⍣ ⍵) board]}

  ⍝ Show first three generations
  (gen 1) (gen 2) (gen 3)
`
      return {
        code,
        cmOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          mode: 'text/apl',
          lineWrapping: false,
          theme: 'paraiso-dark'
        }
      }
    }
  }
</script>

