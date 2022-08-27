import { defineComponent, shallowRef, computed, watch, toRaw, onMounted, onBeforeUnmount, h } from 'vue'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { createEditorState, createEditorView, destroyEditorView, getEditorTools } from './codemirror'
import { useGlobalConfig, DEFAULT_CONFIG } from './config'
import { props, ConfigProps } from './props'
import { events, EventKey } from './events'

export default defineComponent({
  name: 'VueCodemirror',
  props: { ...props },
  emits: { ...events },
  setup(props, context) {
    const container = shallowRef<HTMLDivElement>()
    const state = shallowRef<EditorState>()
    const view = shallowRef<EditorView>()

    const defaultConfig: ConfigProps = {
      ...DEFAULT_CONFIG,
      ...useGlobalConfig()
    }

    const config = computed<ConfigProps>(() => {
      const result = {} as Required<ConfigProps>
      Object.keys(toRaw(props)).forEach((key: any) => {
        if (key !== 'modelValue') {
          // @ts-ignore
          // MARK: ensure access to `prop[key]` original object
          result[key] = props[key] ?? defaultConfig[key]
        }
      })
      return result
    })

    onMounted(() => {
      state.value = createEditorState({
        doc: props.modelValue,
        selection: config.value.selection,
        // The extensions are split into two parts, global and component prop.
        // Only the global part is initialized here.
        // The prop part is dynamically reconfigured after the component is mounted.
        extensions: defaultConfig.extensions ?? [],
        onFocus: (viewUpdate) => context.emit(EventKey.Focus, viewUpdate),
        onBlur: (viewUpdate) => context.emit(EventKey.Blur, viewUpdate),
        onUpdate: (viewUpdate) => context.emit(EventKey.Update, viewUpdate),
        onChange: (newDoc, viewUpdate) => {
          if (newDoc !== props.modelValue) {
            context.emit(EventKey.Change, newDoc, viewUpdate)
            context.emit(EventKey.ModelUpdate, newDoc, viewUpdate)
          }
        }
      })

      view.value = createEditorView({
        state: state.value,
        parent: container.value!,
        root: config.value.root
      })

      const editorTools = getEditorTools(view.value)

      // watch prop.modelValue
      watch(
        () => props.modelValue,
        (newValue) => {
          if (newValue !== editorTools.getDoc()) {
            editorTools.setDoc(newValue)
          }
        }
      )

      // watch prop.extensions
      watch(
        () => props.extensions,
        (extensions) => editorTools.reExtensions(extensions || []),
        { immediate: true }
      )

      // watch prop.disabled
      watch(
        () => config.value.disabled,
        (disabled) => editorTools.toggleDisabled(disabled),
        { immediate: true }
      )

      // watch prop.indentWithTab
      watch(
        () => config.value.indentWithTab,
        (iwt) => editorTools.toggleIndentWithTab(iwt),
        { immediate: true }
      )

      // watch prop.tabSize
      watch(
        () => config.value.tabSize,
        (tabSize) => editorTools.setTabSize(tabSize!),
        { immediate: true }
      )

      // watch prop.phrases
      watch(
        () => config.value.phrases,
        (phrases) => editorTools.setPhrases(phrases || {}),
        { immediate: true }
      )

      // watch prop.placeholder
      watch(
        () => config.value.placeholder,
        (placeholder) => editorTools.setPlaceholder(placeholder!),
        { immediate: true }
      )

      // watch prop.style
      watch(
        () => config.value.style,
        (style) => editorTools.setStyle(style),
        { immediate: true }
      )

      // immediate autofocus
      if (config.value.autofocus) {
        editorTools.focus()
      }

      context.emit(EventKey.Ready, {
        state: state.value!,
        view: view.value!,
        container: container.value!
      })
    })

    onBeforeUnmount(() => {
      if (config.value.autoDestroy && view.value) {
        destroyEditorView(view.value)
      }
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
