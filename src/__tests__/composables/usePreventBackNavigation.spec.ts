import { withSetup } from '@/../test-utils'
import { usePreventBackNavigation } from '@/composables/usePreventBackNavigation'
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest'

describe('usePreventBackNavigation', () => {
  beforeAll(() => {
    vi.spyOn(window, 'removeEventListener').mockImplementation(vi.fn())
    vi.spyOn(history, 'pushState').mockImplementation(vi.fn())
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  test('pushes state to history instantly', () => {
    vi.spyOn(window, 'addEventListener').mockImplementationOnce(vi.fn())

    withSetup(usePreventBackNavigation)
    expect(history.pushState).toHaveBeenCalledWith(
      null,
      '',
      window.location.href
    )
  })

  test('calls onBackPress when back navigation is attempted', () => {
    const onBackPress = vi.fn()
    withSetup(() => usePreventBackNavigation(onBackPress))

    window.dispatchEvent(new PopStateEvent('popstate'))

    expect(history.pushState).toHaveBeenCalledTimes(2)
    expect(onBackPress).toHaveBeenCalled()
  })

  test('cleans up the event listener on unmount', () => {
    vi.spyOn(window, 'addEventListener').mockImplementationOnce(vi.fn())

    const { app } = withSetup(usePreventBackNavigation)
    app.unmount()
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'popstate',
      expect.any(Function)
    )
  })
})
