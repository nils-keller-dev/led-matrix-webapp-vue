// stores/counter.spec.ts
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test } from 'vitest'
import { useStore } from '../../src/store/store'

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('initializes state as null', () => {
    const store = useStore()
    expect(store.state).toBeNull()
  })

  test('initializes images as null', () => {
    const store = useStore()
    expect(store.images).toBeNull()
  })
})
