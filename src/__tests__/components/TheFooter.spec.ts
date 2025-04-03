import TheFooter from '@/components/TheFooter.vue'
import UiSlider from '@/components/ui/UiSlider.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

const mountingOptions = {
  props: {
    modelValue: 50
  }
}

describe('TheFooter', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(TheFooter, mountingOptions)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('updates v-model', () => {
    const wrapper = shallowMount(TheFooter, mountingOptions)

    const uiSlider = wrapper.findComponent(UiSlider)
    uiSlider.vm.$emit('update:modelValue', 75)

    expect(wrapper.emitted('update:modelValue')![0]).toEqual([75])
  })
})
