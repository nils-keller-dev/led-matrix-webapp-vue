import ImageItem from '@/components/image/ImageItem.vue'
import { handleTapAndHold } from '@/utils/handleTapAndHold'
import { shallowMount } from '@vue/test-utils'
import { ImageOff } from 'lucide-vue-next'
import { describe, expect, test, vi } from 'vitest'

vi.mock('@/utils/handleTapAndHold')

const mountingOptions = {
  props: {
    image: 'imageUrl',
    isSelected: false
  }
}

describe('ImageItem', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(ImageItem, mountingOptions)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders with correct image path', () => {
    const wrapper = shallowMount(ImageItem, mountingOptions)

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('api/image/imageUrl')
  })

  test('emits delete event on handleTapAndHold trigger', () => {
    vi.mocked(handleTapAndHold).mockImplementationOnce((_el, callback) =>
      callback()
    )
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    const wrapper = shallowMount(ImageItem, mountingOptions)

    expect(handleTapAndHold).toHaveBeenCalledOnce()
    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this image?'
    )
    expect(wrapper.emitted('delete')![0]).toEqual(['imageUrl'])
  })

  test('emits no delete event when window.confirm returns false', () => {
    vi.mocked(handleTapAndHold).mockImplementationOnce((_el, callback) =>
      callback()
    )
    vi.spyOn(window, 'confirm').mockReturnValue(false)

    const wrapper = shallowMount(ImageItem, mountingOptions)

    expect(handleTapAndHold).toHaveBeenCalledOnce()
    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this image?'
    )
    expect(wrapper.emitted('delete')).toBeUndefined()
  })

  test('emits select event on click', () => {
    const wrapper = shallowMount(ImageItem, mountingOptions)

    wrapper.trigger('click')

    expect(wrapper.emitted('select')![0]).toEqual(['imageUrl'])
  })

  test('applies selected class when isSelected is true', () => {
    const wrapper = shallowMount(ImageItem, {
      props: { ...mountingOptions.props, isSelected: true }
    })

    expect(wrapper.classes()).toContain('outline-primary')
  })

  test('makes img visible when it loads', async () => {
    const wrapper = shallowMount(ImageItem, mountingOptions)

    const img = wrapper.find('img')
    await img.trigger('load')

    expect(img.classes()).toContain('opacity-100')
  })

  test('displays icon instead of image when img fails to load', async () => {
    const wrapper = shallowMount(ImageItem, mountingOptions)

    expect(wrapper.findComponent(ImageOff).exists()).toBe(false)

    const img = wrapper.find('img')
    await img.trigger('error')

    expect(wrapper.findComponent(ImageOff).exists()).toBe(true)
  })

  test('prevents context menu event', () => {
    const wrapper = shallowMount(ImageItem, mountingOptions)

    const event = new Event('contextmenu')
    const preventDefault = vi.fn()
    event.preventDefault = preventDefault

    wrapper.find('div').element.dispatchEvent(event)
    expect(preventDefault).toHaveBeenCalledOnce()
  })
})
