import { patchState } from '@/api/state.patch'
import BrightnessSlider from '@/components/BrightnessSlider.vue'
import TheFooter from '@/components/TheFooter.vue'
import { createTestingPinia } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import { setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test, vi } from 'vitest'

vi.mock('@/api/state.patch')

describe('TheFooter', () => {
  beforeEach(() => {
    setActivePinia(
      createTestingPinia({
        createSpy: vi.fn,
        initialState: { store: { state: { global: { brightness: 50 } } } }
      })
    )
  })

  test('matches snapshot', () => {
    const wrapper = shallowMount(TheFooter)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('calls patchState on brightness change', () => {
    const wrapper = shallowMount(TheFooter)

    const brightnessSlider = wrapper.findComponent(BrightnessSlider)
    brightnessSlider.vm.$emit('update:modelValue', 75)

    expect(patchState).toHaveBeenCalledWith({ global: { brightness: 75 } })
  })
})
