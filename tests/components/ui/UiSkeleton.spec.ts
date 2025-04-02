import UiSkeleton from '@/components/ui/UiSkeleton.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

describe('UiSkeleton', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(UiSkeleton)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
