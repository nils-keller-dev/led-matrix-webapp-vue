import ImageList from '@/components/image/ImageList.vue'
import SettingsImage from '@/components/settings/SettingsImage.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

const mountingOptions = {
  props: {
    image: 'test-image'
  }
}

describe('SettingsImage', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(SettingsImage, mountingOptions)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('passes the correct selected image to ImageList', () => {
    const wrapper = shallowMount(SettingsImage, mountingOptions)

    const imageList = wrapper.findComponent(ImageList)

    expect(imageList.props('selected')).toBe('test-image')
  })
})
