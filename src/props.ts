import type { CSSProperties } from 'vue'
import { PropType, ExtractPropTypes } from 'vue'
import { EditorStateConfig } from '@codemirror/state'

const UNDEFINED = void 0
const NonDefaultBooleanType = {
  type: Boolean,
  default: UNDEFINED
}

export const configProps = {
  autofocus: NonDefaultBooleanType,
  disabled: NonDefaultBooleanType,
  indentWithTab: NonDefaultBooleanType,
  tabSize: Number,
  placeholder: String,
  style: Object as PropType<CSSProperties>,
  autoDestroy: NonDefaultBooleanType,
  phrases: Object as PropType<Record<string, string>>,
  // codemirror options
  root: Object as PropType<ShadowRoot | Document>,
  extensions: Array as PropType<EditorStateConfig['extensions']>,
  selection: Object as PropType<EditorStateConfig['selection']>
}

export const modelValueProp = {
  modelValue: {
    type: String,
    default: ''
  }
}

export const props = {
  ...configProps,
  ...modelValueProp
}

export type ConfigProps = ExtractPropTypes<typeof configProps>
export type Props = ExtractPropTypes<typeof props>
export type PropKey = keyof Props
