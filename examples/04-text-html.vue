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
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/04-text-html.vue">
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
  import 'codemirror/mode/xml/xml.js'

  // theme css
  import 'codemirror/theme/ambiance.css'

  // require active-line.js
  import'codemirror/addon/selection/active-line.js'

  // autoCloseTags
  import'codemirror/addon/edit/closetag.js'
  
  export default {
    data() {
const code =
`<html style="color: green">
  <!-- this is a comment -->
  <head>
    <title>HTML Example</title>
  </head>
  <body>
    <!-- 可以尝试输入<p>，会自动补全 -->
    <!-- 下翻，尝试删除外文，你会发现编辑器支持语言反转 -->
    The indentation tries to be <em>somewhat &amp;quot;do what
    I mean&amp;quot;</em>... but might not match your style.
    <!-- Piece of the CodeMirror manual, 'translated' into Arabic by Google Translate -->
    <dl>
      <dt id=option_value><code>value (string or Doc)</code></dt>
      <dd>قيمة البداية المحرر. يمكن أن تكون سلسلة، أو. كائن مستند.</dd>
      <dt id=option_mode><code>mode (string or object)</code></dt>
      <dd>وضع الاستخدام. عندما لا تعطى، وهذا الافتراضي إلى الطريقة الاولى
      التي تم تحميلها. قد يكون من سلسلة، والتي إما أسماء أو ببساطة هو وضع
      MIME نوع المرتبطة اسطة. بدلا من ذلك، قد يكون من كائن يحتوي على
      خيارات التكوين لواسطة، مع <code>name</code> الخاصية التي وضع أسماء
      (على سبيل المثال <code>{name: "javascript", json: true}</code>).
      صفحات التجريبي لكل وضع تحتوي على معلومات حول ما معلمات تكوين وضع
      يدعمها. يمكنك أن تطلب CodeMirror التي تم تعريفها طرق وأنواع MIME
      الكشف على <code>CodeMirror.modes</code>
      و <code>CodeMirror.mimeModes</code> الكائنات. وضع خرائط الأسماء
      الأولى لمنشئات الخاصة بهم، وخرائط لأنواع MIME 2 المواصفات
      واسطة.</dd>
      <dt id=option_theme><code>theme (string)</code></dt>
      <dd>موضوع لنمط المحرر مع. يجب عليك التأكد من الملف CSS تحديد
      المقابلة <code>.cm-s-[name]</code> يتم تحميل أنماط (انظر
      <a href="../theme/"><code>theme</code></a> الدليل في التوزيع).
      الافتراضي هو <code>"default"</code> ، والتي تم تضمينها في
      الألوان <code>codemirror.css</code>. فمن الممكن استخدام فئات متعددة
      في تطبيق السمات مرة واحدة على سبيل المثال <code>"foo bar"</code>
      سيتم تعيين كل من <code>cm-s-foo</code> و <code>cm-s-bar</code>
      الطبقات إلى المحرر.</dd>
    </dl>
  </body>
</html>
`
      return {
        code,
        cmOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          autoCloseTags: true,
          line: true,
          mode: 'text/html',
          theme: 'ambiance'
        }
      }
    }
  }
</script>

