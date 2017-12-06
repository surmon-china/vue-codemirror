
import Codemirror from 'codemirror'
import Vue from 'vue/dist/vue.js'
import VueCodemirror, { codemirror, install } from '../../../src/index.js'

window.Vue = Vue

// console.log('--------VueCodemirror', VueCodemirror)

describe('vue-codemirror', () => {

  Vue.use(VueCodemirror, {
    options: {},
    events: []
  })

  // 测试解构是否成功
  it('can get the object in es module', () => {
    expect(typeof install).to.deep.equal('function')
    expect(typeof codemirror.methods.initialize).to.deep.equal('function')
  })

  /*

  // 全局安装
  describe('Global install spa:component', () => {
    it(' - should can get the codemirror element', done => {
      const vm = new Vue({
        template: `<div><codemirror v-model="content"></codemirror></div>`,
        data: {
          content: '<p>test content</p>',
        }
      }).$mount()
      expect(vm.$children[0].value).to.deep.equal('<p>test content</p>')
      Vue.nextTick(() => {
        expect(vm.$children[0].codemirror instanceof Codemirror).to.equal(true)
        expect(vm.$children[0].codemirror.getText()).to.deep.equal('test content\n')
        done()
      })
    })
  })

  // 全局配置测试
  describe('Get instance by attr ref and set global options', () => {
    it(' - should get the codemirror instance and global options', done => {
      const vm = new Vue({
        template: `<div><codemirror ref="myTextEditor" v-model="content"></codemirror></div>`,
        data: {
          content: '<p>test content</p>'
        },
        computed: {
          editor() {
            return this.$refs.myTextEditor
          },
          codemirror() {
            return this.editor.codemirror
          }
        }
      }).$mount()
      Vue.nextTick(() => {
        expect(vm.codemirror instanceof Codemirror).to.equal(true)
        expect(vm.codemirror.getText()).to.deep.equal('test content\n')
        expect(Object.keys(vm.editor._options).length >= 5).to.equal(true)
        done()
      })
    })
  })

  // 全局配置覆盖
  describe('Set component options', () => {
    it(' - should codemirror.placeholder === component.options.placeholder', done => {
      const vm = new Vue({
        template: `<div><codemirror ref="myTextEditor" :options="editorOption" v-model="content"></codemirror></div>`,
        data: {
          content: '<p>test content</p>',
          editorOption: {
            placeholder: 'component placeholder'
          }
        },
        computed: {
          editor() {
            return this.$refs.myTextEditor
          },
          codemirror() {
            return this.editor.codemirror
          }
        }
      }).$mount()
      Vue.nextTick(() => {
        // 配置是否等同局部配置
        const placeholder = vm.editor._options.placeholder
        const isInclude = placeholder === 'component placeholder' || placeholder === undefined
        expect(isInclude).to.equal(true)
        done()
      })
    })
  })

  // 数据绑定
  describe('Component data binding', () => {
    it(' - should change the codemirror content after change the component content data', done => {
      const vm = new Vue({
        template: `<div><codemirror v-model="content" ref="myTextEditor"></codemirror></div>`,
        data: {
          content: '<p>test content</p>'
        },
        computed: {
          codemirror() {
            return this.$refs.myTextEditor.codemirror
          }
        },
        mounted() {
          this.content = '<span>test change</span>'
        }
      }).$mount()
      Vue.nextTick(() => {
        expect(vm.codemirror.getText()).to.deep.equal('test change\n')
        expect(vm.codemirror.editor.delta.ops).to.deep.equal([{ insert: "test change\n" }])
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
                      <codemirror ref="myTextEditor"
                                    :value="content"
                                    @blur="onEditorBlur"
                                    @focus="onEditorFocus"
                                    @ready="onEditorReady"
                                    @change="onEditorChange"
                                    @input="onEditorInput">
                      </codemirror>
                  </div>
                  `,
        data: {
          content: '<p>test content</p>'
        },
        computed: {
          editor() {
            return this.$refs.myTextEditor
          },
          codemirror() {
            return this.editor.codemirror
          }
        },
        methods: {
          onEditorBlur(codemirror) {
            console.log('onEditorBlur', codemirror)
            eventLogs.push('onEditorBlur')
          },
          onEditorFocus(codemirror) {
            console.log('onEditorFocus', codemirror)
            eventLogs.push('onEditorFocus')
          },
          onEditorReady(codemirror) {
            eventLogs.push('onEditorReady')
            // mockEvennt(this.editor.$el.children[1])
            // triggerEvent(this.editor.$el.children[0].children[0].children[0], 'MouseEvent')
          },
          onEditorChange({ codemirror, text, html }) {
            eventLogs.push('onEditorChange' + text)
            // expect(codemirror instanceof Codemirror).to.deep.equal(true)
            // expect(!!text).to.deep.equal(true)
            // expect(!!html).to.deep.equal(true)
          },
          onEditorInput(html) {
            eventLogs.push('onEditorInput' + html)
            // expect(html).to.deep.equal('<p>test change</p>')
          }
        },
        mounted() {
          eventLogs.push('mounted')
          this.content = '<span>test change</span>'
        }
      }).$mount()

      // console.log('----------', eventLogs)
      expect(eventLogs[0]).to.deep.equal('onEditorReady')
      expect(eventLogs[1]).to.deep.equal('mounted')
      done()
      // console.log('onEditorReady', this.editor.$el.children[1].children[0].dispatchEvent(event), event)
      // expect(codemirror instanceof Codemirror).to.deep.equal(true)
        // setTimeout(() => {
          // this.content = '<p>test change</p>'
        // }, 1000)
    })
  })

  // 局部安装
  describe('Local install component', () => {
    it(' - should work', done => {
      const eventLogs = []
      const vm = new Vue({
        template: `<div>
                      <vue-codemirror ref="myTextEditor"
                                        v-model="content"
                                        :options="editorOption"
                                        @ready="onEditorReady">
                      </vue-codemirror>
                  </div>
                  `,
        components: {
          'VueCodemirror': codemirror
        },
        data: {
          content: '<p>test content</p>',
          editorOption: {
            placeholder: 'component placeholder'
          }
        },
        computed: {
          codemirror() {
            return this.$refs.myTextEditor.codemirror
          }
        },
        methods: {
          onEditorReady(codemirror) {
            eventLogs.push('onEditorReady')
          }
        },
        mounted() {
          this.content = '<span>test change</span>'
        }
      }).$mount()
      Vue.nextTick(() => {
        expect(eventLogs[0]).to.deep.equal('onEditorReady')
        expect(vm.codemirror instanceof Codemirror).to.deep.equal(true)
        expect(vm.codemirror.getText()).to.deep.equal('test change\n')
        expect(vm.codemirror.editor.delta.ops).to.deep.equal([{ insert: "test change\n" }])
        done()
      })
    })
  })

  // 多个循环实例
  describe('Multi edirot component instance', () => {
    it(' - should update value after any change text', done => {
      const eventLogs = []
      const vm = new Vue({
        template: `<div>
                      <codemirror :key="key"
                                    :value="content"
                                    :ref="'editor' + key"
                                    v-for="(content, key) in contents"
                                    :options="buildOptions(key)"
                                    @ready="onEditorReady(key)">
                      </codemirror>
                  </div>
                  `,
        data: {
          contents: {
            a: '<p>a-test content</p>',
            b: '<p>b-test content</p>',
            c: '<p>c-test content</p>'
          }
        },
        methods: {
          buildOptions(key) {
            return {
              placeholder: `${key}component placeholder`
            }
          },
          onEditorReady(key) {
            eventLogs.push(`${key}-onEditorReady`)
          }
        }
      }).$mount()
      expect(eventLogs[0]).to.deep.equal('a-onEditorReady')
      expect(eventLogs[1]).to.deep.equal('b-onEditorReady')
      expect(eventLogs[2]).to.deep.equal('c-onEditorReady')
      expect(vm.$refs.editora[0].codemirror.getText()).to.deep.equal('a-test content\n')
      expect(vm.$refs.editorb[0].codemirror.getText()).to.deep.equal('b-test content\n')
      expect(vm.$refs.editorc[0].codemirror.getText()).to.deep.equal('c-test content\n')
      vm.contents.b = '<p>b-test change</p>'
      Vue.nextTick(() => {
        expect(vm.$refs.editorb[0].codemirror.getText()).to.deep.equal('b-test change\n')
        expect(vm.$refs.editorb[0].codemirror instanceof Codemirror).to.deep.equal(true)
        done()
      })
    })
  })

  // SSR 全局安装测试
  describe('Global install ssr:directive', () => {
    it(' - should get codemirror instance and capture event', done => {
      const eventLogs = []
      const vm = new Vue({
        template: `<div>
                    <div class="codemirror" 
                         ref="editor"
                         @ready="onEditorReady"
                         :value="content"
                         v-codemirror:myCodemirrorEditor="editorOption">
                    </div>
                  </div>
                  `,
        data: {
          content: '<p>test ssr content</p>',
          editorOption: {}
        },
        methods: {
          onEditorReady(codemirror) {
            eventLogs.push('ssr/onEditorReady')
            eventLogs.push(codemirror instanceof Codemirror)
          }
        },
        mounted() {
          eventLogs.push('ssr/mounted')
        }
      }).$mount()
      expect(eventLogs[0]).to.deep.equal('ssr/onEditorReady')
      expect(eventLogs[1]).to.deep.equal(true)
      expect(eventLogs[2]).to.deep.equal('ssr/mounted')
      vm.content = '<p>test ssr change</p>'
      Vue.nextTick(() => {
        expect(vm.myCodemirrorEditor.getText()).to.deep.equal('test ssr content\n')
        done()
      })
    })
  })
  */
})
