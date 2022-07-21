import { EditorState } from '@codemirror/state'
import { EditorView, ViewUpdate } from '@codemirror/view'

export enum EventKey {
  Change = 'change',
  Update = 'update',
  Focus = 'focus',
  Blur = 'blur',
  Ready = 'ready',
  ModelUpdate = 'update:modelValue'
}

export const editorEvents = {
  // when content(doc) change only
  [EventKey.Change]: (value: string, viewUpdate: ViewUpdate) => true,
  // when codemirror state change
  [EventKey.Update]: (viewUpdate: ViewUpdate) => true,
  [EventKey.Focus]: (viewUpdate: ViewUpdate) => true,
  [EventKey.Blur]: (viewUpdate: ViewUpdate) => true,
  // when component mounted
  [EventKey.Ready]: (payload: { view: EditorView; state: EditorState; container: HTMLDivElement }) => true
}

export const modelUpdateEvent = {
  [EventKey.ModelUpdate]: editorEvents[EventKey.Change]
}

export const events = {
  ...editorEvents,
  ...modelUpdateEvent
}

export type EditorEvents = typeof editorEvents
export type Events = typeof events
