
import Codemirror from 'codemirror'
import Vue from 'vue/dist/vue.js'
import VueCodemirror, { codemirror, install } from '../../../src/index.js'

// language
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/xml/xml.js'

window.Vue = Vue

console.log('--------VueCodemirror', VueCodemirror)

describe('vue-codemirror', () => {

  Vue.use(VueCodemirror, {
    options: {
      mode: 'text/javascript'
    },
    events: []
  })

  // 测试解构是否成功
  it('can get the object in es module', () => {
    expect(typeof install).to.deep.equal('function')
    expect(typeof codemirror.methods.initialize).to.deep.equal('function')
  })


  // 全局安装
  describe('Global install spa:component', () => {
    it(' - should can get the codemirror element', done => {
      const vm = new Vue({
        template: `<div><codemirror v-model="code" :options="cmOptions"></codemirror></div>`,
        data: {
          code: 'const a = 10',
          cmOptions: {
            mode: 'text/javascript'
          }
        }
      }).$mount()
      expect(vm.$children[0].value).to.deep.equal('const a = 10')
      Vue.nextTick(() => {
        expect(vm.$children[0].codemirror instanceof Codemirror).to.equal(true)
        expect(vm.$children[0].codemirror.getValue()).to.deep.equal('const a = 10')
        done()
      })
    })
  })

  // 全局配置测试
  describe('Get instance by attr ref and set global options', () => {
    it(' - should get the codemirror instance and global options', done => {
      const vm = new Vue({
        template: `<div><codemirror v-model="code" ref="cm"></codemirror></div>`,
        data: {
          code: 'const a = 10'
        },
        computed: {
          cm() {
            return this.$refs.cm
          },
          codemirror() {
            return this.cm.codemirror
          }
        }
      }).$mount()
      Vue.nextTick(() => {
        expect(vm.codemirror instanceof Codemirror).to.equal(true)
        expect(vm.codemirror.getValue()).to.deep.equal('const a = 10')
        expect(vm.codemirror.options.mode).to.deep.equal('text/javascript')
        done()
      })
    })
  })

  // 全局配置覆盖
  describe('Set component options', () => {
    it(' - should codemirror.placeholder === component.options.placeholder', done => {
      const vm = new Vue({
        template: `<div><codemirror ref="cm" :options="cmOption" v-model="code"></codemirror></div>`,
        data: {
          code: '<p>hello</p>',
          cmOption: {
            mode: 'text/html'
          }
        },
        computed: {
          cm() {
            return this.$refs.cm
          },
          codemirror() {
            return this.cm.codemirror
          }
        }
      }).$mount()
      Vue.nextTick(() => {
        // console.log('------', vm.codemirror)
        // 配置是否等同局部配置
        expect(vm.codemirror instanceof Codemirror).to.equal(true)
        expect(vm.codemirror.getValue()).to.deep.equal('<p>hello</p>')
        expect(vm.codemirror.options.mode).to.deep.equal('text/html')
        done()
      })
    })
  })

  // 数据绑定
  describe('Component data binding', () => {
    it(' - should change the codemirror content after change the component content data', done => {
      const vm = new Vue({
        template: `<div><codemirror ref="cm" :options="cmOption" v-model="code"></codemirror></div>`,
        data: {
          code: '<p>test content</p>',
          cmOption: {
            mode: 'text/html'
          }
        },
        computed: {
          cm() {
            return this.$refs.cm
          },
          codemirror() {
            return this.cm.codemirror
          }
        },
        mounted() {
          this.code = '<p>test change</p>'
        }
      }).$mount()
      Vue.nextTick(() => {
        expect(vm.codemirror.getValue()).to.deep.equal('<p>test change</p>')
        done()
      })
    })
  })

  // 广播事件
  describe('Component emit event and data binding by evennt', () => {
    it(' - should capture event after the codemirror emit event', done => {
      const eventLogs = []
      const vm = new Vue({
        template: `<div>
                      <codemirror ref="cm"
                                  :value="code"
                                  :options="{ mode: 'text/javascript' }"
                                  @blur="onCmBlur"
                                  @focus="onCmFocus"
                                  @ready="onCmReady"
                                  @change="onCmChange"
                                  @input="onCmInput">
                      </codemirror>
                  </div>
                  `,
        data: {
          code: '<p>test content</p>'
        },
        computed: {
          cm() {
            return this.$refs.cm
          },
          codemirror() {
            return this.cm.codemirror
          }
        },
        methods: {
          onCmBlur(codemirror) {
            console.log('onCmBlur', codemirror)
            eventLogs.push('onCmBlur')
          },
          onCmFocus(codemirror) {
            console.log('onCmFocus', codemirror)
            eventLogs.push('onCmFocus')
          },
          onCmReady(codemirror) {
            eventLogs.push('onCmReady')
          },
          onCmChange({ codemirror, text, html }) {
            eventLogs.push('onCmChange' + text)
          },
          onCmInput(html) {
            eventLogs.push('onCmInput' + html)
          }
        },
        mounted() {
          eventLogs.push('mounted')
          this.code = '<span>test change</span>'
        }
      }).$mount()
      // console.log('----------', vm)
      expect(eventLogs[0]).to.deep.equal('onCmReady')
      expect(eventLogs[1]).to.deep.equal('mounted')
      vm.$nextTick(() => {
        expect(vm.codemirror.getValue()).to.deep.equal('<span>test change</span>')
        done()
      })
    })
  })

  // 局部安装
  describe('Local install component', () => {
    it(' - should work', done => {
      const eventLogs = []
      const vm = new Vue({
        template: `<div>
                      <vue-codemirror ref="cm"
                                      v-model="code"
                                      :options="cmOption"
                                      @ready="onCmReady">
                      </vue-codemirror>
                  </div>
                  `,
        components: {
          'VueCodemirror': codemirror
        },
        data: {
          code: '<p>test content</p>',
          cmOption: {
            mode: 'text/html'
          }
        },
        computed: {
          codemirror() {
            return this.$refs.cm.codemirror
          }
        },
        methods: {
          onCmReady(codemirror) {
            eventLogs.push('onCmReady')
          }
        },
        mounted() {
          this.code = '<span>test change</span>'
        }
      }).$mount()
      Vue.nextTick(() => {
        expect(eventLogs[0]).to.deep.equal('onCmReady')
        expect(vm.codemirror instanceof Codemirror).to.deep.equal(true)
        expect(vm.codemirror.getValue()).to.deep.equal('<span>test change</span>')
        expect(vm.codemirror.options.mode).to.deep.equal('text/html')
        done()
      })
    })
  })
})
