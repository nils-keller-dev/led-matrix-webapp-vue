import UiTextArea from '@/components/ui/UiTextArea.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'

const mountingOptions = {
  props: {
    modelValue: 'text value content',
    placeholder: 'custom placeholder'
  }
}

describe('UiTextArea', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(UiTextArea, mountingOptions)

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders with placeholder', () => {
    const wrapper = shallowMount(UiTextArea, mountingOptions)

    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('placeholder')).toBe('custom placeholder')
  })

  test('updates v-model', () => {
    const wrapper = shallowMount(UiTextArea, mountingOptions)

    const textarea = wrapper.find('textarea')
    textarea.setValue('new value')
    textarea.trigger('blur')

    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['new value'])
  })

  test('blurs textarea on enter', () => {
    const wrapper = shallowMount(UiTextArea, mountingOptions)

    const textarea = wrapper.find('textarea')
    const blur = vi.fn()
    textarea.element.blur = blur
    textarea.trigger('keydown', { key: 'Enter' })

    expect(blur).toHaveBeenCalledOnce()
  })
})
