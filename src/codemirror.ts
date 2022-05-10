import { EditorState, EditorStateConfig, Compartment, Extension, StateEffect } from '@codemirror/state'
import { EditorView, ViewUpdate, keymap, placeholder } from '@codemirror/view'
import { indentWithTab } from '@codemirror/commands'
import { indentUnit } from '@codemirror/language'
import * as CSS from 'csstype'

// state
export interface EditorStateCreatorOptions {
  config: EditorStateConfig
  onUpdate(viewUpdate: ViewUpdate): void
  onChange(doc: string, viewUpdate: ViewUpdate): void
  onFocus(viewUpdate: ViewUpdate): void
  onBlur(viewUpdate: ViewUpdate): void
}
export const createState = ({ config, ...events }: EditorStateCreatorOptions): EditorState => {
  const extensions = Array.isArray(config.extensions) ? config.extensions : [config.extensions]
  return EditorState.create({
    doc: config.doc,
    selection: config.selection,
    extensions: [
      ...extensions,
      EditorView.updateListener.of((viewUpdate) => {
        // https://discuss.codemirror.net/t/codemirror-6-proper-way-to-listen-for-changes/2395/11
        events.onUpdate(viewUpdate)
        if (viewUpdate.docChanged) {
          events.onChange(viewUpdate.state.doc.toString(), viewUpdate)
        }
        if (viewUpdate.focusChanged) {
          viewUpdate.view.hasFocus ? events.onFocus(viewUpdate) : events.onBlur(viewUpdate)
        }
        viewUpdate.view.hasFocus
      })
    ]
  })
}

// doc
export const getDoc = (view: EditorView) => view.state.doc.toString()
export const setDoc = (view: EditorView, newDoc: string) => {
  return view.dispatch({
    changes: {
      from: 0,
      to: view.state.doc.length,
      insert: newDoc
    }
  })
}

// effects
export const destroy = (view: EditorView) => view.destroy()
export const focus = (view: EditorView) => view.focus() // TODO: focus on the last word

// https://codemirror.net/6/examples/config/
// https://github.com/uiwjs/react-codemirror/blob/22cc81971a/src/useCodeMirror.ts#L144
// https://gist.github.com/s-cork/e7104bace090702f6acbc3004228f2cb
const rerunCompartment = () => {
  const compartment = new Compartment()
  const run = (view: EditorView, extension: Extension) => {
    if (compartment.get(view.state)) {
      // reconfigure
      view.dispatch({ effects: compartment.reconfigure(extension) })
    } else {
      // inject
      view.dispatch({ effects: StateEffect.appendConfig.of(compartment.of(extension)) })
    }
  }
  return { compartment, run }
}

// https://codemirror.net/6/examples/reconfigure/
export const rerunExtension = () => rerunCompartment().run
export const toggleExtension = (extension: Extension) => {
  const { compartment, run } = rerunCompartment()
  return (view: EditorView, targetApply?: boolean) => {
    const exExtension = compartment.get(view.state)
    const apply = targetApply ?? exExtension !== extension
    run(view, apply ? extension : [])
  }
}

// extensions
export const extensions = {
  placeholder: (string: string) => placeholder(string),
  disable: () => [EditorView.editable.of(false), EditorState.readOnly.of(true)],
  enable: () => [EditorView.editable.of(true), EditorState.readOnly.of(false)],
  // https://codemirror.net/6/examples/tab/
  indentWithTab: () => keymap.of([indentWithTab]),
  tabSize: (tabSize: number) => [EditorState.tabSize.of(tabSize), indentUnit.of(' '.repeat(tabSize))],
  // https://codemirror.net/6/examples/styling/
  style: (style: CSS.Properties) => EditorView.theme({ '&': { ...style } })
}
