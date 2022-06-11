import {
  defineComponent,
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  h,
  PropType,
  ExtractPropTypes
} from 'vue'
import * as CSS from 'csstype'
import { basicSetup } from 'codemirror'
import { EditorState, EditorStateConfig } from '@codemirror/state'
import { EditorView, ViewUpdate } from '@codemirror/view'
import { useGlobalConfig } from './config'
import * as cm from './codemirror'

const globalProps = {
  autofocus: {
    type: Boolean,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: undefined
  },
  indentWithTab: {
    type: Boolean,
    default: undefined
  },
  tabSize: Number,
  placeholder: String,
  style: Object as PropType<CSS.Properties>,
  // codemirror options
  root: Object as PropType<ShadowRoot | Document>,
  extensions: Array as PropType<EditorStateConfig['extensions']>,
  selection: Object as PropType<EditorStateConfig['selection']>
}

export type Props = ExtractPropTypes<typeof globalProps>
export const DEFAULT_CONFIG: Readonly<Partial<Props>> = Object.freeze({
  autofocus: false,
  disabled: false,
  indentWithTab: true,
  tabSize: 2,
  placeholder: '',
  extensions: [basicSetup]
})

export default defineComponent({
  name: 'VueCodemirror',
  props: {
    modelValue: {
      type: String,
      required: false,
      default: ''
    },
    ...globalProps
  },
  emits: {
    // when content(doc) change only
    'update:modelValue': (value: string, viewUpdate: ViewUpdate) => true,
    change: (value: string, viewUpdate: ViewUpdate) => true,
    // when codemirror state change
    update: (viewUpdate: ViewUpdate) => true,
    focus: (viewUpdate: ViewUpdate) => true,
    blur: (viewUpdate: ViewUpdate) => true,
    // when component mounted
    ready: (payload: { view: EditorView; state: EditorState; container: HTMLDivElement }) => true
  },
  setup(props, context) {
    const container = ref<HTMLDivElement>()
    const component = {
      view: null as any as EditorView,
      state: null as any as EditorState
    }
    const defaultConfig = {
      ...DEFAULT_CONFIG,
      ...useGlobalConfig()
    }

    const config = computed(() => {
      return Object.keys(props).reduce(
        (result, key) => ({
          ...result,
          // @ts-ignore
          [key]: props[key] ?? defaultConfig[key]
        }),
        {} as Required<Props>
      )
    })

    onMounted(() => {
      // init codemirror
      component.state = cm.createState({
        config: {
          doc: props.modelValue,
          selection: config.value.selection,
          // The extensions are split into two parts, global and component prop.
          // Only the global part is initialized here.
          // The prop part is dynamically reconfigured after the component is mounted.
          extensions: defaultConfig.extensions
        },
        onFocus: (viewUpdate) => context.emit('focus', viewUpdate),
        onBlur: (viewUpdate) => context.emit('blur', viewUpdate),
        onUpdate: (viewUpdate) => context.emit('update', viewUpdate),
        onChange: (doc, viewUpdate) => {
          if (doc !== props.modelValue) {
            context.emit('update:modelValue', doc, viewUpdate)
            context.emit('change', doc, viewUpdate)
          }
        }
      })

      component.view = new EditorView({
        state: component.state,
        parent: container.value!,
        root: config.value.root
      })

      // watch prop.extensions
      const reExtensions = cm.rerunExtension()
      watch(
        () => props.extensions,
        (extensions) => reExtensions(component.view, extensions || []),
        { immediate: true }
      )

      // watch prop.disabled
      const toggleDisabled = cm.toggleExtension(cm.extensions.disable())
      watch(
        () => config.value.disabled,
        (disabled) => toggleDisabled(component.view, disabled),
        { immediate: true }
      )

      // watch prop.indentWithTab
      const toggleIWT = cm.toggleExtension(cm.extensions.indentWithTab())
      watch(
        () => config.value.indentWithTab,
        (iwt) => toggleIWT(component.view, iwt),
        { immediate: true }
      )

      // watch prop.tabSize
      const reTabSize = cm.rerunExtension()
      watch(
        () => config.value.tabSize,
        (tabSize) => reTabSize(component.view, cm.extensions.tabSize(tabSize)),
        { immediate: true }
      )

      // watch prop.placeholder
      const rePlaceholder = cm.rerunExtension()
      watch(
        () => config.value.placeholder,
        (placeholder) => rePlaceholder(component.view, cm.extensions.placeholder(placeholder)),
        { immediate: true }
      )

      // watch prop.style
      const reStyle = cm.rerunExtension()
      watch(
        () => config.value.style,
        (style) => reStyle(component.view, cm.extensions.style(style)),
        { immediate: true }
      )

      // watch prop.modal value
      watch(
        () => props.modelValue,
        (newValue) => {
          if (newValue !== cm.getDoc(component.view)) {
            cm.setDoc(component.view, newValue)
          }
        }
      )

      // immediate autofocus
      if (config.value.autofocus) {
        cm.focus(component.view)
      }

      // ready
      context.emit('ready', {
        ...component,
        container: container.value!
      })
    })

    onBeforeUnmount(() => {
      // destroy codemirror
      cm.destroy(component.view)
    })

    return () => {
      return h('div', {
        class: 'v-codemirror',
        style: { display: 'contents' },
        ref: container
      })
    }
  }
})
