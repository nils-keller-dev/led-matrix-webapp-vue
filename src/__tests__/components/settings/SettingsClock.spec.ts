import { patchState } from '@/api/state.patch'
import SettingsClock from '@/components/settings/SettingsClock.vue'
import UiColorInput from '@/components/ui/UiColorInput.vue'
import UiSlider from '@/components/ui/UiSlider.vue'
import UiToggle from '@/components/ui/UiToggle.vue'
import { useStore } from '@/store/store'
import { rgbToHex } from '@/utils/ColorConversion'
import { createTestingPinia } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import { setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'

vi.mock('@/api/state.patch')

const mountingOptions = {
  props: {
    color: [0, 0, 0],
    backgroundColor: [255, 255, 255],
    backgroundBrightness: 50
  },
  global: {
    renderStubDefaultSlot: true
  }
}

describe('SettingsClock', () => {
  beforeEach(() => {
    setActivePinia(
      createTestingPinia({
        createSpy: vi.fn,
        initialState: {
          store: { state: { clock: {} } }
        }
      })
    )
  })

  test('matches snapshot', () => {
    const wrapper = shallowMount(SettingsClock, mountingOptions)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('passes the color prop to the text UiColorInput', async () => {
    const wrapper = shallowMount(SettingsClock, mountingOptions)
    const uiColorInput = wrapper.findComponent(UiColorInput)

    expect(uiColorInput.props('modelValue')).toBe('#000000')

    await wrapper.setProps({ color: [255, 0, 0] })

    expect(uiColorInput.props('modelValue')).toBe('#ff0000')
  })

  test('passes the backgroundColor prop to the background UiColorInput', async () => {
    const wrapper = shallowMount(SettingsClock, mountingOptions)
    const uiColorInput = wrapper.findAllComponents(UiColorInput)[1]

    expect(uiColorInput.props('modelValue')).toBe('#ffffff')

    await wrapper.setProps({ backgroundColor: [0, 0, 255] })

    expect(uiColorInput.props('modelValue')).toBe('#0000ff')
  })

  test('passes the backgroundBrightness prop to the UiSlider', async () => {
    const wrapper = shallowMount(SettingsClock, mountingOptions)
    const uiSlider = wrapper.findComponent(UiSlider)

    expect(uiSlider.props('modelValue')).toBe(50)

    await wrapper.setProps({ backgroundBrightness: 75 })

    expect(uiSlider.props('modelValue')).toBe(75)
  })

  test('updates store when color changes', async () => {
    vi.mocked(patchState).mockResolvedValueOnce({} as unknown as Response)
    const store = useStore()

    const wrapper = shallowMount(SettingsClock, mountingOptions)
    expect(store.state!.clock.color).toBeUndefined()

    wrapper.findComponent(UiColorInput).vm.$emit('update:modelValue', '#00ff00')
    await nextTick()

    expect(patchState).toHaveBeenCalledWith({ clock: { color: [0, 255, 0] } })
    expect(store.state!.clock.color).toStrictEqual([0, 255, 0])
  })

  test('updates store when backgroundColor changes', async () => {
    vi.mocked(patchState).mockResolvedValueOnce({} as unknown as Response)
    const store = useStore()

    const wrapper = shallowMount(SettingsClock, mountingOptions)
    expect(store.state!.clock.backgroundColor).toBeUndefined()

    wrapper
      .findAllComponents(UiColorInput)[1]
      .vm.$emit('update:modelValue', '#0f0f0f')
    await nextTick()

    expect(patchState).toHaveBeenCalledWith({
      clock: { backgroundColor: [15, 15, 15] }
    })
    expect(store.state!.clock.backgroundColor).toStrictEqual([15, 15, 15])
  })

  test('updates store when backgroundBrightness changes', async () => {
    vi.mocked(patchState).mockResolvedValueOnce({} as unknown as Response)
    const store = useStore()

    const wrapper = shallowMount(SettingsClock, mountingOptions)
    expect(store.state!.clock.backgroundBrightness).toBeUndefined()

    wrapper.findComponent(UiSlider).vm.$emit('update:modelValue', 100)
    await nextTick()

    expect(patchState).toHaveBeenCalledWith({
      clock: { backgroundBrightness: 100 }
    })
    expect(store.state!.clock.backgroundBrightness).toBe(100)
  })
})
