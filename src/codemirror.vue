<template>
  <textarea></textarea>
</template>

<script>
  import _CodeMirror from 'codemirror'
  import codemirror from './codemirror.vue'
  const CodeMirror = window.CodeMirror || _CodeMirror
  export default {
    name: 'codemirror',
    data() {
      return {
        content: '',
        codemirror: null
      }
    },
    props: {
      code: String,
      value: String,
      events: Array,
      unseenLines: Array,
      marker: Function,
      globalOptions: {
        type: Object,
        default: () => {}
      },
      globalEvents: {
        type: Array,
        default: () => []
      },
      options: {
        type: Object,
        required: true
      },
    },
    watch: {
      options: {
        deep: true,
        handler(options, oldOptions) {
          for (const key in options) {
            this.codemirror.setOption(key, options[key])
          }
        }
      },
      code(newVal, oldVal) {
        this.handerCodeChange(newVal, oldVal)
      },
      value(newVal, oldVal) {
        this.handerCodeChange(newVal, oldVal)
      }
    },
    methods: {
      initialize() {
        this.codemirror = CodeMirror.fromTextArea(this.$el, this.options)
        this.codemirror.setValue(this.code || this.value || this.content)
        this.codemirror.on('change', cm => {
          this.content = cm.getValue()
          if (this.$emit) {
            this.$emit('change', this.content)
            this.$emit('input', this.content)
          }
        })
        let events = [
          'scroll',
          'changes',
          'beforeChange',
          'cursorActivity',
          'keyHandled',
          'inputRead',
          'electricInput',
          'beforeSelectionChange',
          'viewportChange',
          'swapDoc',
          'gutterClick',
          'gutterContextMenu',
          'focus',
          'blur',
          'refresh',
          'optionChange',
          'scrollCursorIntoView',
          'update'
        ];
        if (this.events && this.events.length) {
          events = events.concat(this.events)
        }
        for (let i = 0; i < events.length; i++) {
          if (events.indexOf(events[i]) == i) {
            (event => {
              this.codemirror.on(event, (a, b, c) => {
                this.$emit(event, a, b, c)
              })
            })(events[i])
          }
        }
        this.$emit('ready', this.codemirror)
        this.unseenLineMarkers()

        // prevents funky dynamic rendering
        this.$nextTick(this.refresh)
      },
      refresh() {
        this.codemirror.refresh()
      },
      destroy() {
        // garbage cleanup
        const element = this.codemirror.doc.cm.getWrapperElement()
        element && element.remove && element.remove()
      },
      handerCodeChange(newVal, oldVal) {
        const cm_value = this.codemirror.getValue()
        if (newVal !== cm_value) {
          const scrollInfo = this.codemirror.getScrollInfo()
          this.codemirror.setValue(newVal)
          this.content = newVal
          this.codemirror.scrollTo(scrollInfo.left, scrollInfo.top)
        }
        this.unseenLineMarkers()
      },
      unseenLineMarkers() {
        if (this.unseenLines !== undefined && this.marker !== undefined) {
          this.unseenLines.forEach(line => {
            const info = this.codemirror.lineInfo(line)
            this.codemirror.setGutterMarker(line, 'breakpoints', info.gutterMarkers ? null : this.marker())
          })
        }
      }
    },
    mounted() {
      this.initialize()
    },
    beforeDestroy() {
      this.destroy()
    }
  }
</script>
