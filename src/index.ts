import type { Plugin } from 'vue'
import type { Props } from './props'
import { injectGlobalConfig } from './config'
import Component from './component'

export type { Props } from './props'
export type { Events } from './events'
export { DEFAULT_CONFIG } from './config'

export const Codemirror = Component
export const install: Plugin = (app, defaultConfig?: Props) => {
  app.component(Component.name, Component)
  app.component('Codemirror', Component)
  injectGlobalConfig(app, defaultConfig)
}

export default {
  Codemirror,
  install
}
