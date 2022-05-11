import type { Plugin } from 'vue'
import Component, { Props } from './component'
import { injectGlobalConfig } from './config'

export * from '@codemirror/view'
export * from '@codemirror/state'
export * from '@codemirror/basic-setup'
export { Props, DEFAULT_CONFIG } from './component'

export const Codemirror = Component
export const install: Plugin = (app, defaultConfig?: Props) => {
  app.component(Component.name, Component)
  injectGlobalConfig(app, defaultConfig)
}

export default {
  Codemirror: Component,
  install
}
