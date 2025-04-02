import UiWrapper from '@/components/ui/UiWrapper.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

const mountingOptions = {
  props: {
    title: 'test title',
    htmlFor: 'customId'
  },
  slots: {
    default: 'child content'
  }
}

describe('UiWrapper', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(UiWrapper, mountingOptions)

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders title', () => {
    const wrapper = shallowMount(UiWrapper, mountingOptions)

    expect(wrapper.text()).toContain('test title')
  })

  test('renders with custom htmlFor prop', () => {
    const wrapper = shallowMount(UiWrapper, mountingOptions)

    expect(wrapper.find('label').attributes('for')).toBe('customId')
  })
})
