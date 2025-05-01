import { getImages } from '@/api/images.get'
import { getState } from '@/api/state.get'
import { patchState } from '@/api/state.patch'
import App from '@/App.vue'
import SettingsClock from '@/components/settings/SettingsClock.vue'
import SettingsImage from '@/components/settings/SettingsImage.vue'
import SettingsMusic from '@/components/settings/SettingsMusic.vue'
import SettingsText from '@/components/settings/SettingsText.vue'
import TheFooter from '@/components/TheFooter.vue'
import UiCarousel from '@/components/ui/UiCarousel.vue'
import UiDrawer from '@/components/ui/UiDrawer.vue'
import { usePreventBackNavigation } from '@/composables/usePreventBackNavigation'
import { Mode } from '@/constants/enums/Mode'
import { TextAlign } from '@/constants/enums/TextAlign'
import { useStore } from '@/store/store'
import { createTestingPinia } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import { LoaderCircle } from 'lucide-vue-next'
import { setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'

vi.mock('@/api/state.patch')
vi.mock('@/composables/usePreventBackNavigation')

vi.mock('@/api/images.get', () => ({
  getImages: vi.fn(() => Promise.resolve(['image1.jpg', 'image2.jpg']))
}))

vi.mock('@/api/state.get', () => ({
  getState: vi.fn(() =>
    Promise.resolve({
      global: {
        mode: Mode[0],
        brightness: 50
      },
      text: {
        text: 'test text',
        align: TextAlign.left,
        speed: 2,
        size: 5,
        color: [255, 0, 123]
      },
      image: {
        image: 'hamster.jpg'
      },
      clock: {
        color: [255, 255, 0],
        backgroundColor: [0, 0, 0],
        backgroundBrightness: 50
      },
      music: {
        fullscreen: false
      }
    })
  )
}))

describe('App', () => {
  beforeEach(() => {
    setActivePinia(
      createTestingPinia({
        createSpy: vi.fn
      })
    )
  })

  test('matches snapshot', async () => {
    const wrapper = shallowMount(App)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('shows loader when state or images are not loaded', async () => {
    const wrapper = shallowMount(App)
    await nextTick()

    useStore().state = null
    await nextTick()

    expect(wrapper.findComponent(LoaderCircle).exists()).toBe(true)
    expect(wrapper.findComponent(UiCarousel).exists()).toBe(false)
  })

  test('loads state and images on mount', async () => {
    shallowMount(App)

    expect(getState).toHaveBeenCalledOnce()
    expect(getImages).toHaveBeenCalledOnce()
  })

  test('initializes usePreventBackNavigation with drawer close function', async () => {
    let mockedCallback: undefined | (() => void)
    vi.mocked(usePreventBackNavigation).mockImplementation(
      (callback) => (mockedCallback = callback)
    )

    const wrapper = shallowMount(App)
    expect(usePreventBackNavigation).toHaveBeenCalledOnce()

    await nextTick()
    const drawer = wrapper.findComponent(UiDrawer)

    await drawer.vm.$emit('update:open', true)
    expect(drawer.props().open).toBe(true)

    mockedCallback?.()
    await nextTick()

    expect(drawer.props().open).toBe(false)
  })

  test('opens drawer when carousel settings are clicked', async () => {
    const wrapper = shallowMount(App)
    await nextTick()

    const drawer = wrapper.findComponent(UiDrawer)
    expect(drawer.props().open).toBe(false)

    await wrapper.findComponent(UiCarousel).vm.$emit('clickSettings')

    expect(drawer.props().open).toBe(true)
  })

  test('calls patchState on carousel change', async () => {
    const wrapper = shallowMount(App)
    await nextTick()

    await wrapper.findComponent(UiCarousel).vm.$emit('change', 2)

    expect(patchState).toHaveBeenCalledWith({ global: { mode: Mode[2] } })
  })

  test('does not call patchState when carousel changes with initial flag', async () => {
    const wrapper = shallowMount(App)
    await nextTick()

    await wrapper.findComponent(UiCarousel).vm.$emit('change', 1, true)

    expect(patchState).not.toHaveBeenCalled()
  })

  test('calls patchState when brightness changes', async () => {
    const wrapper = shallowMount(App)
    await nextTick()

    wrapper.findComponent(TheFooter).vm.$emit('update:modelValue', 75)

    expect(patchState).toHaveBeenCalledWith({ global: { brightness: 75 } })
  })

  test.each`
    carouselIndex | component
    ${0}          | ${SettingsClock}
    ${1}          | ${SettingsMusic}
    ${2}          | ${SettingsImage}
    ${3}          | ${SettingsText}
  `(
    'displays $component.__name on carousel index $carouselIndex',
    async ({ carouselIndex, component }) => {
      const wrapper = shallowMount(App, {
        global: {
          renderStubDefaultSlot: true
        }
      })
      await nextTick()

      await wrapper
        .findComponent(UiCarousel)
        .vm.$emit('change', carouselIndex, true)

      expect(wrapper.findComponent(component).exists()).toBe(true)
    }
  )
})
