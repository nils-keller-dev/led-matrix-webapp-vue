import UiDialog from '@/components/ui/UiDialog.vue'
import { shallowMount } from '@vue/test-utils'
import { DialogContent, DialogRoot } from 'reka-ui'
import { describe, expect, test, vi } from 'vitest'

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

describe('UiDialog', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(UiDialog, mountingOptions)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('connects v-model correctly', () => {
    const wrapper = shallowMount(UiDialog, mountingOptions)

    wrapper.findComponent(DialogRoot).vm.$emit('update:open', false)

    expect(wrapper.emitted('update:open')![0]).toEqual([false])
  })

  test('prevents pointer down outside event', () => {
    const wrapper = shallowMount(UiDialog, mountingOptions)

    const preventDefault = vi.fn()
    wrapper.findComponent(DialogContent).vm.$emit('pointerDownOutside', {
      preventDefault
    })

    expect(preventDefault).toHaveBeenCalledOnce()
  })
})
