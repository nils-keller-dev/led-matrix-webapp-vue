import UiButton from '@/components/ui/UiButton.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

const mountingOptions = {
  props: {
    text: 'Button text'
  }
}

describe('UiButton', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(UiButton, mountingOptions)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders with text', () => {
    const wrapper = shallowMount(UiButton, mountingOptions)

    expect(wrapper.classes()).toContain('bg-primary')
    expect(wrapper.text()).toContain('Button text')
  })

  test('applies correct primary classes', () => {
    const wrapper = shallowMount(UiButton, mountingOptions)

    expect(wrapper.classes()).toContain('bg-primary')
    expect(wrapper.classes()).toContain('text-background')
  })

  test('applies correct secondary class', () => {
    const wrapper = shallowMount(UiButton, {
      props: {
        ...mountingOptions.props,
        isSecondary: true
      }
    })

    expect(wrapper.classes()).toContain('border-muted-foreground')
  })
})
