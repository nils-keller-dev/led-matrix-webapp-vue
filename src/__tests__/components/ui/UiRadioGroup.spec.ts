import UiRadioGroup from '@/components/ui/UiRadioGroup.vue'
import { shallowMount } from '@vue/test-utils'
import { AlignCenter, AlignLeft } from 'lucide-vue-next'
import { describe, expect, test } from 'vitest'

const mountingOptions = {
  props: {
    icons: [AlignLeft, AlignCenter],
    values: ['value1', 'value2'],
    modelValue: 'value1'
  }
}

describe('UiRadioGroup', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(UiRadioGroup, mountingOptions)

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('displays given icons', () => {
    const wrapper = shallowMount(UiRadioGroup, mountingOptions)

    const icon1 = wrapper.findComponent(mountingOptions.props.icons[0])
    const icon2 = wrapper.findComponent(mountingOptions.props.icons[1])

    expect(icon1.exists()).toBe(true)
    expect(icon2.exists()).toBe(true)
  })

  test('updates v-model', () => {
    const wrapper = shallowMount(UiRadioGroup, mountingOptions)

    const radioButtons = wrapper.findAll('input')
    radioButtons[1].setValue(true)

    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['value2'])
  })
})
