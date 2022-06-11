import type { Plugin } from 'vue'
import Component, { Props } from './component'
import { injectGlobalConfig } from './config'

export type { Props } from './component'
export { DEFAULT_CONFIG } from './component'

// Stop exports codemirror primitive interface to prevent module domain flooding naming conflicts.
// export * from 'codemirror'
// export * from '@codemirror/view'
// export * from '@codemirror/state'
// export * from '@codemirror/commands'
// export * from '@codemirror/language'

export const Codemirror = Component
export const install: Plugin = (app, defaultConfig?: Props) => {
  app.component(Component.name, Component)
  injectGlobalConfig(app, defaultConfig)
}

export default {
  Codemirror: Component,
  install
}
