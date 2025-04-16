import { nextTick, ref } from 'vue'
import UiCarousel from '@/components/ui/UiCarousel.vue'
import { Mode } from '@/constants/enums/Mode'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import UiIconButton from '@/components/ui/UiIconButton.vue'
import emblaCarouselVue from 'embla-carousel-vue'

vi.mock('embla-carousel-vue', () => ({
  default: vi.fn().mockReturnValue([
    ref(),
    ref({
      scrollSnapList: vi.fn().mockReturnValue([0, 1]),
      scrollTo: vi.fn(),
      selectedScrollSnap: vi.fn().mockReturnValue(0),
      on: vi.fn().mockImplementation((_, callback) => callback()),
      scrollPrev: vi.fn(),
      scrollNext: vi.fn()
    })
  ])
}))

const mountingOptions = {
  props: {
    slides: [
      {
        title: 'Slide 1',
        id: Mode.clock,
        hasConfiguration: true
      },
      {
        title: 'Slide 2',
        id: Mode.idle,
        hasConfiguration: false
      }
    ],
    initialValue: 1
  },
  global: {
    renderStubDefaultSlot: true
  }
}

describe('UiCarousel', () => {
  test('matches snapshot', async () => {
    const wrapper = shallowMount(UiCarousel, mountingOptions)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders slides correctly', () => {
    const wrapper = shallowMount(UiCarousel, mountingOptions)

    expect(wrapper.html()).toContain('Slide 1')
    expect(wrapper.html()).toContain('Slide 2')

    const configuration = wrapper.findAll('span + div')
    expect(configuration.length).toBe(1)
  })

  test('renders navigation dots correctly', async () => {
    const wrapper = shallowMount(UiCarousel, mountingOptions)
    await nextTick()

    const dots = wrapper.findAll('ui-icon-button-stub + div div')

    expect(dots.length).toBe(2)
    expect(dots[0].attributes('class')).toContain('bg-muted-foreground')
    expect(dots[1].attributes('class')).toContain('bg-secondary')
  })

  test('emits clickSettings when settings are clicked', async () => {
    const wrapper = shallowMount(UiCarousel, mountingOptions)
    const configuration = wrapper.findAll('span + div')

    await configuration[0].trigger('click')
    expect(wrapper.emitted('clickSettings')).toBeTruthy()
  })

  test('calls scrollPrev when previous button is clicked', async () => {
    const wrapper = shallowMount(UiCarousel, mountingOptions)

    expect(emblaCarouselVue()[1].value?.scrollPrev).not.toHaveBeenCalled()
    await wrapper.findComponent(UiIconButton).trigger('click')
    expect(emblaCarouselVue()[1].value?.scrollPrev).toHaveBeenCalled()
  })

  test('calls scrollNext when next button is clicked', async () => {
    const wrapper = shallowMount(UiCarousel, mountingOptions)

    expect(emblaCarouselVue()[1].value?.scrollNext).not.toHaveBeenCalled()
    await wrapper.findAllComponents(UiIconButton)[1].trigger('click')
    expect(emblaCarouselVue()[1].value?.scrollNext).toHaveBeenCalled()
  })

  test('emits change event correctly', async () => {
    vi.useFakeTimers()

    const wrapper = shallowMount(UiCarousel, mountingOptions)
    expect(wrapper.emitted('change')?.length).toBe(1)
    expect(wrapper.emitted('change')![0]).toStrictEqual([0, true])

    vi.runAllTimers()

    expect(wrapper.emitted('change')?.length).toBe(2)
    expect(wrapper.emitted('change')![1]).toStrictEqual([0])

    vi.useRealTimers()
  })

  test('behaves correctly with undefined emblaApi', async () => {
    vi.mocked(emblaCarouselVue).mockReturnValueOnce([ref(), ref()])

    const wrapper = shallowMount(UiCarousel, mountingOptions)

    const uiIconButtons = wrapper.findAllComponents(UiIconButton)
    await uiIconButtons[0].trigger('click')
    await uiIconButtons[1].trigger('click')

    expect(wrapper.emitted('change')).toBeUndefined()
  })

  test('scrolls to initialValue on mount', () => {
    shallowMount(UiCarousel, mountingOptions)
    expect(emblaCarouselVue()[1].value?.scrollTo).toHaveBeenCalledWith(1, true)
  })
})
