import { test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VueCodemirror, { Codemirror, install } from '../src/index'

// https://test-utils.vuejs.org/api
test('export type', async () => {
  expect(Codemirror).toBeDefined()
  expect(install).toBeTypeOf('function')
  expect(VueCodemirror).toBeDefined()
  expect(VueCodemirror.install).toBeTypeOf('function')
  expect(VueCodemirror.Codemirror).toBeDefined()
  expect(VueCodemirror.Codemirror).toEqual(Codemirror)
  expect(VueCodemirror.install).toEqual(install)
})

test('mount component', async () => {
  const wrapper = mount(Codemirror, { props: { modelValue: 'Hello, world!' } })
  expect(wrapper.emitted()).toHaveProperty('ready')
  // TODO: test case
})
