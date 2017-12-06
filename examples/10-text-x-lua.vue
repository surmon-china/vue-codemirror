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
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/10-text-x-lua.vue">
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
  import 'codemirror/mode/lua/lua.js'

  // theme css
  import 'codemirror/theme/hopscotch.css'

  export default {
    data() {
const code =
`
--[[
example useless code to show lua syntax highlighting
this is multiline comment
]]

function blahblahblah(x)

  local table = {
    "asd" = 123,
    "x" = 0.34,
  }
  if x ~= 3 then
    print( x )
  elseif x == "string"
    my_custom_function( 0x34 )
  else
    unknown_function( "some string" )
  end

  --single line comment

end

function blablabla3()

  for k,v in ipairs( table ) do
    --abcde..
    y=[=[
  x=[[
      x is a multi line string
   ]]
  but its definition is iside a highest level string!
  ]=]
    print(" "" ")

    s = math.sin( x )
  end

end
`
      return {
        code,
        cmOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          mode: 'text/x-lua',
          theme: 'hopscotch'
        }
      }
    }
  }
</script>

