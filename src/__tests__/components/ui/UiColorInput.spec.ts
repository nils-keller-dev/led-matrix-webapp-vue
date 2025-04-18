import UiColorInput from '@/components/ui/UiColorInput.vue'
import UiSkeleton from '@/components/ui/UiSkeleton.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'

vi.mock('@/utils/fetchColorName', () => ({
  fetchColorName: vi.fn(() => Promise.resolve('black'))
}))

const mountingOptions = {
  props: {
    id: '1',
    modelValue: '#000000'
  },
  global: {
    renderStubDefaultSlot: true
  }
}

describe('UiColorInput', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(UiColorInput, mountingOptions)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders colorName when it has value', async () => {
    const wrapper = shallowMount(UiColorInput, mountingOptions)

    expect(wrapper.findComponent(UiSkeleton).exists()).toBe(true)
    await nextTick()

    expect(wrapper.findComponent(UiSkeleton).exists()).toBe(false)
    expect(wrapper.html()).toContain('black')
  })

  test.each`
    inputValue   | expectedSkeleton
    ${'#000000'} | ${false}
    ${''}        | ${false}
    ${'#ff0000'} | ${true}
  `(
    'shows UiSkeleton = $expectedSkeleton when inputValue is "$inputValue"',
    async ({ inputValue, expectedSkeleton }) => {
      const wrapper = shallowMount(UiColorInput, mountingOptions)
      await nextTick()

      const input = wrapper.find('input')
      input.setValue(inputValue)
      input.trigger('change')
      await nextTick()

      expect(wrapper.findComponent(UiSkeleton).exists()).toBe(expectedSkeleton)
    }
  )

  test('updates v-model after timeout', async () => {
    vi.useFakeTimers()

    const wrapper = shallowMount(UiColorInput, mountingOptions)
    await nextTick()

    const input = wrapper.find('input')
    input.setValue('#ff0000')
    input.trigger('change')
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    vi.runAllTimers()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['#ff0000'])
    vi.useRealTimers()
  })
})
