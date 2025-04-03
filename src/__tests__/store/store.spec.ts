// stores/counter.spec.ts
import { useStore } from '@/store/store'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test } from 'vitest'

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
