import type { Plugin } from 'vue'
import Component, { Props } from './component'
import { injectGlobalConfig } from './config'

export const Codemirror = Component
export const install: Plugin = (app, defaultConfig?: Props) => {
  app.component(Component.name, Component)
  injectGlobalConfig(app, defaultConfig)
}

export default {
  Codemirror: Component,
  install
}
