import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import UiSkeleton from '../../../src/components/ui/UiSkeleton.vue'

describe('UiSkeleton', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(UiSkeleton)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
