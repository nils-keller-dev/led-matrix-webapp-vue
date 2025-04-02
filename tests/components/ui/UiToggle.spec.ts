import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import UiToggle from '../../../src/components/ui/UiToggle.vue'

const mountingOptions = {
  props: {
    id: 'customId',
    modelValue: false
  }
}

describe('UiToggle', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(UiToggle, mountingOptions)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test.each([true, false])(
    'renders correctly with modelValue = %s',
    (modelValue) => {
      const wrapper = shallowMount(UiToggle, {
        props: {
          modelValue
        }
      })

      const checkbox = wrapper.find<HTMLInputElement>('input[type="checkbox"]')
      expect(checkbox.element.checked).toBe(modelValue)
    }
  )

  test.each`
    modelValue | classWrapper      | classChild
    ${true}    | ${'bg-primary'}   | ${'translate-x-full'}
    ${false}   | ${'bg-secondary'} | ${'translate-x-0'}
  `(
    'renders with correct classes for $modelValue value',
    ({ modelValue, classWrapper, classChild }) => {
      const wrapper = shallowMount(UiToggle, {
        props: {
          modelValue
        }
      })

      const toggleElement = wrapper.find('label').element.firstElementChild
      expect(toggleElement?.classList).toContain(classWrapper)
      expect(toggleElement?.firstElementChild?.classList).toContain(classChild)
    }
  )

  test('renders with custom id prop', () => {
    const wrapper = shallowMount(UiToggle, mountingOptions)

    expect(wrapper.find('label').attributes('for')).toBe('customId')
    expect(wrapper.find('input').attributes('id')).toBe('customId')
  })

  test('updates v-model', () => {
    const wrapper = shallowMount(UiToggle, mountingOptions)

    const checkbox = wrapper.find<HTMLInputElement>('input[type="checkbox"]')
    checkbox.setValue(true)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})
