import TheHeader from '@/components/TheHeader.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'

vi.mock('@/../package.json', () => ({
  default: { version: '0.0.0' }
}))

describe('TheHeader', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(TheHeader)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders with version number', () => {
    const wrapper = shallowMount(TheHeader)

    expect(wrapper.text()).toContain('v0.0.0')
  })
})
