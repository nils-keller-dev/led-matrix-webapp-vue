import { patchState } from '@/api/state.patch'
import SettingsMusic from '@/components/settings/SettingsMusic.vue'
import UiToggle from '@/components/ui/UiToggle.vue'
import { useStore } from '@/store/store'
import { createTestingPinia } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import { setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'

vi.mock('@/api/state.patch')

const mountingOptions = {
  props: {
    fullscreen: false
  },
  global: {
    renderStubDefaultSlot: true
  }
}

describe('SettingsMusic', () => {
  beforeEach(() => {
    setActivePinia(
      createTestingPinia({
        createSpy: vi.fn,
        initialState: {
          store: { state: { music: {} } }
        }
      })
    )
  })

  test('matches snapshot', () => {
    const wrapper = shallowMount(SettingsMusic, mountingOptions)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('passes the fullscreen prop to the UiToggle', async () => {
    const wrapper = shallowMount(SettingsMusic, mountingOptions)
    const uiToggle = wrapper.findComponent(UiToggle)

    expect(uiToggle.props('modelValue')).toBe(false)

    wrapper.setProps({ fullscreen: true })
    await nextTick()

    expect(uiToggle.props('modelValue')).toBe(true)
  })

  test('updates store when toggle changes', async () => {
    vi.mocked(patchState).mockResolvedValueOnce({} as unknown as Response)
    const store = useStore()

    const wrapper = shallowMount(SettingsMusic, mountingOptions)
    expect(store.state!.music.fullscreen).toBeUndefined()

    wrapper.findComponent(UiToggle).vm.$emit('update:modelValue', true)
    await nextTick()

    expect(patchState).toHaveBeenCalledWith({ music: { fullscreen: true } })
    expect(store.state!.music.fullscreen).toBe(true)
  })
})
