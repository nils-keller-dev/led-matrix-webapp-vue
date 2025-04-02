import UiIconButton from '@/components/ui/UiIconButton.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

describe('UiIconButton', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(UiIconButton, {
      slots: {
        default: 'child content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
