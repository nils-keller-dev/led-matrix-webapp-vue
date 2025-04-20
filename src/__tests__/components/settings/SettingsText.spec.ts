import { patchState } from '@/api/state.patch'
import SettingsText from '@/components/settings/SettingsText.vue'
import UiColorInput from '@/components/ui/UiColorInput.vue'
import UiRadioGroup from '@/components/ui/UiRadioGroup.vue'
import UiSlider from '@/components/ui/UiSlider.vue'
import UiTextArea from '@/components/ui/UiTextArea.vue'
import { TextAlign } from '@/constants/enums/TextAlign'
import { useStore } from '@/store/store'
import { createTestingPinia } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import { setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'

vi.mock('@/api/state.patch')

const mountingOptions = {
  props: {
    align: TextAlign.left,
    text: 'Test',
    size: 1,
    speed: 1,
    color: [0, 0, 0]
  },
  global: {
    renderStubDefaultSlot: true
  }
}

describe('SettingsText', () => {
  beforeEach(() => {
    setActivePinia(
      createTestingPinia({
        createSpy: vi.fn,
        initialState: {
          store: { state: { text: {} } }
        }
      })
    )
  })

  test('matches snapshot', () => {
    const wrapper = shallowMount(SettingsText, mountingOptions)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('passes the align prop to the UiRadioGroup', async () => {
    const wrapper = shallowMount(SettingsText, mountingOptions)
    const uiSlider = wrapper.findComponent(UiRadioGroup)

    expect(uiSlider.props('modelValue')).toBe(TextAlign.left)

    await wrapper.setProps({ align: TextAlign.center })

    expect(uiSlider.props('modelValue')).toBe(TextAlign.center)
  })

  test('passes the text prop to the UiTextArea', async () => {
    const wrapper = shallowMount(SettingsText, mountingOptions)
    const uiSlider = wrapper.findComponent(UiTextArea)

    expect(uiSlider.props('modelValue')).toBe('Test')

    await wrapper.setProps({ text: 'New Text' })

    expect(uiSlider.props('modelValue')).toBe('New Text')
  })

  test('passes the size prop to the UiSlider', async () => {
    const wrapper = shallowMount(SettingsText, mountingOptions)
    const uiSlider = wrapper.findComponent(UiSlider)

    expect(uiSlider.props('modelValue')).toBe(1)

    await wrapper.setProps({ size: 4 })

    expect(uiSlider.props('modelValue')).toBe(4)
  })

  test('passes the speed prop to the UiSlider', async () => {
    const wrapper = shallowMount(SettingsText, mountingOptions)
    const uiSlider = wrapper.findAllComponents(UiSlider)[1]

    expect(uiSlider.props('modelValue')).toBe(1)

    await wrapper.setProps({ speed: 10 })

    expect(uiSlider.props('modelValue')).toBe(10)
  })

  test('passes the color prop to the UiColorInput', async () => {
    const wrapper = shallowMount(SettingsText, mountingOptions)
    const uiColorInput = wrapper.findComponent(UiColorInput)

    expect(uiColorInput.props('modelValue')).toBe('#000000')

    await wrapper.setProps({ color: [255, 0, 0] })

    expect(uiColorInput.props('modelValue')).toBe('#ff0000')
  })

  test('updates store when align changes', async () => {
    vi.mocked(patchState).mockResolvedValueOnce({} as unknown as Response)
    const store = useStore()

    const wrapper = shallowMount(SettingsText, mountingOptions)
    expect(store.state!.text.align).toBeUndefined()

    wrapper
      .findComponent(UiRadioGroup)
      .vm.$emit('update:modelValue', TextAlign.center)
    await nextTick()

    expect(patchState).toHaveBeenCalledWith({
      text: { align: TextAlign.center }
    })
    expect(store.state!.text.align).toBe(TextAlign.center)
  })

  test('updates store when text changes', async () => {
    vi.mocked(patchState).mockResolvedValueOnce({} as unknown as Response)
    const store = useStore()

    const wrapper = shallowMount(SettingsText, mountingOptions)
    expect(store.state!.text.text).toBeUndefined()

    wrapper.findComponent(UiTextArea).vm.$emit('update:modelValue', 'New Text')
    await nextTick()

    expect(patchState).toHaveBeenCalledWith({
      text: { text: 'New Text' }
    })
    expect(store.state!.text.text).toBe('New Text')
  })

  test.each`
    field      | index
    ${'size'}  | ${0}
    ${'speed'} | ${1}
  `(
    'updates store when $field changes"',
    async ({ field, index }: { field: 'speed' | 'size'; index: number }) => {
      vi.mocked(patchState).mockResolvedValueOnce({} as unknown as Response)
      const store = useStore()

      const wrapper = shallowMount(SettingsText, mountingOptions)
      expect(store.state!.text[field]).toBeUndefined()

      wrapper
        .findAllComponents(UiSlider)
        [index].vm.$emit('update:modelValue', 4)
      await nextTick()

      expect(patchState).toHaveBeenCalledWith({ text: { [field]: 4 } })
      expect(store.state!.text[field]).toBe(4)
    }
  )

  test('updates store when color changes', async () => {
    vi.mocked(patchState).mockResolvedValueOnce({} as unknown as Response)
    const store = useStore()

    const wrapper = shallowMount(SettingsText, mountingOptions)
    expect(store.state!.text.color).toBeUndefined()

    wrapper.findComponent(UiColorInput).vm.$emit('update:modelValue', '#00ff00')
    await nextTick()

    expect(patchState).toHaveBeenCalledWith({ text: { color: [0, 255, 0] } })
    expect(store.state!.text.color).toStrictEqual([0, 255, 0])
  })

  // test('updates store when backgroundColor changes', async () => {
  //   vi.mocked(patchState).mockResolvedValueOnce({} as unknown as Response)
  //   const store = useStore()

  //   const wrapper = shallowMount(SettingsText, mountingOptions)
  //   expect(store.state!.clock.backgroundColor).toBeUndefined()

  //   wrapper
  //     .findAllComponents(UiColorInput)[1]
  //     .vm.$emit('update:modelValue', '#0f0f0f')
  //   await nextTick()

  //   expect(patchState).toHaveBeenCalledWith({
  //     clock: { backgroundColor: [15, 15, 15] }
  //   })
  //   expect(store.state!.clock.backgroundColor).toStrictEqual([15, 15, 15])
  // })

  // test('updates store when backgroundBrightness changes', async () => {
  //   vi.mocked(patchState).mockResolvedValueOnce({} as unknown as Response)
  //   const store = useStore()

  //   const wrapper = shallowMount(SettingsText, mountingOptions)
  //   expect(store.state!.clock.backgroundBrightness).toBeUndefined()

  //   wrapper.findComponent(UiSlider).vm.$emit('update:modelValue', 100)
  //   await nextTick()

  //   expect(patchState).toHaveBeenCalledWith({
  //     clock: { backgroundBrightness: 100 }
  //   })
  //   expect(store.state!.clock.backgroundBrightness).toBe(100)
  // })
})
