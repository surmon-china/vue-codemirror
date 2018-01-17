<template>
  <div class="vue-codemirror" :class="{ merge }">
    <div ref="mergeview" v-if="merge"></div>
    <textarea ref="textarea" :placeholder="placeholder" v-else></textarea>
  </div>
</template>

<script>
  // lib
  import _CodeMirror from 'codemirror'
  const CodeMirror = window.CodeMirror || _CodeMirror

  // pollfill
  if (typeof Object.assign != 'function') {
    Object.defineProperty(Object, 'assign', {
      value(target, varArgs) {
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object')
        }
        const to = Object(target)
        for (let index = 1; index < arguments.length; index++) {
          const nextSource = arguments[index]
          if (nextSource != null) {
            for (const nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey]
              }
            }
          }
        }
        return to
      },
      writable: true,
      configurable: true
    })
  }

  // export
  export default {
    name: 'codemirror',
    data() {
      return {
        content: '',
        codemirror: null,
        cminstance: null
      }
    },
    props: {
      code: String,
      value: String,
      marker: Function,
      unseenLines: Array,
      placeholder: {
        type: String,
        default: ''
      },
      merge: {
        type: Boolean,
        default: false
      },
      options: {
        type: Object,
        default: () => {}
      },
      events: {
        type: Array,
        default: () => []
      },
      globalOptions: {
        type: Object,
        default: () => {}
      },
      globalEvents: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      options: {
        deep: true,
        handler(options, oldOptions) {
          for (const key in options) {
            this.cminstance.setOption(key, options[key])
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
        const cmOptions = Object.assign({}, this.globalOptions, this.options)
        if (this.merge) {
          this.codemirror = CodeMirror.MergeView(this.$refs.mergeview, cmOptions)
          this.cminstance = this.codemirror.edit
        } else {
          this.codemirror = CodeMirror.fromTextArea(this.$refs.textarea, cmOptions)
          this.cminstance = this.codemirror
          this.cminstance.setValue(this.code || this.value || this.content)
        }
        this.cminstance.on('change', cm => {
          this.content = cm.getValue()
          if (this.$emit) {
            this.$emit('input', this.content)
          }
        })
        const events = [
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
        ].concat(this.events).concat(this.globalEvents)
        const onEdEvents = {}
        for (let i = 0; i < events.length; i++) {
          if (typeof events[i] === 'string' && onEdEvents[events[i]] === undefined) {
            (event => {
              onEdEvents[event] = null
              this.cminstance.on(event, (a, b, c) => {
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
        this.cminstance.refresh()
      },
      destroy() {
        // garbage cleanup
        const element = this.cminstance.doc.cm.getWrapperElement()
        element && element.remove && element.remove()
      },
      handerCodeChange(newVal, oldVal) {
        const cm_value = this.cminstance.getValue()
        if (newVal !== cm_value) {
          const scrollInfo = this.cminstance.getScrollInfo()
          this.cminstance.setValue(newVal)
          this.content = newVal
          this.cminstance.scrollTo(scrollInfo.left, scrollInfo.top)
        }
        this.unseenLineMarkers()
      },
      unseenLineMarkers() {
        if (this.unseenLines !== undefined && this.marker !== undefined) {
          this.unseenLines.forEach(line => {
            const info = this.cminstance.lineInfo(line)
            this.cminstance.setGutterMarker(line, 'breakpoints', info.gutterMarkers ? null : this.marker())
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
