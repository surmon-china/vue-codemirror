import { App, inject } from 'vue'
import { Props } from './component'

const CONFIG_SYMBOL = Symbol('vue-codemirror-global-config')
export const injectGlobalConfig = (app: App, config?: Props) => {
  app.provide(CONFIG_SYMBOL, config)
}

export const useGlobalConfig = () => {
  return inject<Props>(CONFIG_SYMBOL, {} as Props)
}
