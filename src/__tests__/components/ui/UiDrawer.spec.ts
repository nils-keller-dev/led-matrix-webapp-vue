import UiDrawer from '@/components/ui/UiDrawer.vue'
import { shallowMount } from '@vue/test-utils'
import { DrawerRoot } from 'vaul-vue'
import { describe, expect, test } from 'vitest'

const mountingOptions = {
  props: {
    open: true
  },
  slots: {
    default: 'child content'
  },
  global: {
    renderStubDefaultSlot: true
  }
}

describe('UiDrawer', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(UiDrawer, mountingOptions)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('updates v-model', () => {
    const wrapper = shallowMount(UiDrawer, mountingOptions)

    wrapper.findComponent(DrawerRoot).vm.$emit('update:open', false)

    expect(wrapper.emitted('update:open')![0]).toEqual([false])
  })
})
