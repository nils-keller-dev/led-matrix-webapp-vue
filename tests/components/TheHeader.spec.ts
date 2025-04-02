import { shallowMount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import TheHeader from '../../src/components/TheHeader.vue'

vi.mock('../../package.json', () => ({
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
