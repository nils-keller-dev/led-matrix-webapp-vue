import UiSlider from '@/components/ui/UiSlider.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'

const mountingOptions = {
  props: {
    min: 0,
    max: 100,
    modelValue: 50
  }
}

describe('UiSlider', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(UiSlider, mountingOptions)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('stops propagation on pointerdown', () => {
    const wrapper = shallowMount(UiSlider, mountingOptions)

    const event = new PointerEvent('pointerdown')
    const stopPropagation = vi.fn()
    event.stopPropagation = stopPropagation

    wrapper.find('span').element.dispatchEvent(event)

    expect(stopPropagation).toHaveBeenCalledOnce()
  })

  test('updates v-model', async () => {
    const wrapper = shallowMount(UiSlider, mountingOptions)

    const root = wrapper.find('span')
    root.element.getBoundingClientRect = () =>
      ({ width: 100, left: 0 }) as DOMRect

    root.element.dispatchEvent(new PointerEvent('pointerdown', { clientX: 10 }))

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    const pointerUpEvent = new PointerEvent('pointerup')
    await window.dispatchEvent(pointerUpEvent)

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([10])
  })

  test('does not update v-model when the slider did not move', () => {
    const wrapper = shallowMount(UiSlider, mountingOptions)

    const root = wrapper.find('span')
    root.element.getBoundingClientRect = () =>
      ({ width: 100, left: 0 }) as DOMRect

    root.trigger('pointerdown', { clientX: 50 })

    const pointerUpEvent = new PointerEvent('pointerup')
    window.dispatchEvent(pointerUpEvent)

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
