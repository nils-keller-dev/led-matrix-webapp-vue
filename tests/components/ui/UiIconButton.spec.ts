import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import UiIconButton from '../../../src/components/ui/UiIconButton.vue'

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
