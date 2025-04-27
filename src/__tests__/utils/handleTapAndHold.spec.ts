import { handleTapAndHold } from '@/utils/handleTapAndHold'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

describe('handleTapAndHold', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('sets a timeout when touchstart is triggered', () => {
    const element = document.createElement('div')
    const callback = vi.fn()

    const setTimeoutSpy = vi.spyOn(window, 'setTimeout')

    handleTapAndHold(element, callback)

    expect(setTimeoutSpy).not.toHaveBeenCalled()

    const touchEvent = new TouchEvent('touchstart')
    element.dispatchEvent(touchEvent)

    expect(setTimeoutSpy).toHaveBeenCalledExactlyOnceWith(
      expect.any(Function),
      600
    )
    expect(callback).not.toHaveBeenCalled()
  })

  test('calls the callback after the timeout elapses', () => {
    const element = document.createElement('div')
    const callback = vi.fn()

    handleTapAndHold(element, callback)

    expect(callback).not.toHaveBeenCalled()

    const touchEvent = new TouchEvent('touchstart')
    element.dispatchEvent(touchEvent)

    vi.runAllTimers()

    expect(callback).toHaveBeenCalledExactlyOnceWith(touchEvent)
  })

  test('clears the timeout when touchcancel is triggered', () => {
    const element = document.createElement('div')
    const callback = vi.fn()

    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout')

    handleTapAndHold(element, callback)

    element.dispatchEvent(new TouchEvent('touchstart'))

    expect(clearTimeoutSpy).not.toHaveBeenCalled()

    element.dispatchEvent(new TouchEvent('touchcancel'))

    expect(clearTimeoutSpy).toHaveBeenCalledOnce()

    vi.runAllTimers()

    expect(callback).not.toHaveBeenCalled()
  })

  test('clears the timeout when touchend is triggered', () => {
    const element = document.createElement('div')
    const callback = vi.fn()

    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout')

    handleTapAndHold(element, callback)

    element.dispatchEvent(new TouchEvent('touchstart'))

    expect(clearTimeoutSpy).not.toHaveBeenCalled()

    element.dispatchEvent(new TouchEvent('touchend'))

    expect(clearTimeoutSpy).toHaveBeenCalledOnce()

    vi.runAllTimers()

    expect(callback).not.toHaveBeenCalled()
  })

  test('adds event listeners with passive option', () => {
    const element = document.createElement('div')
    const addEventListenerSpy = vi.spyOn(element, 'addEventListener')

    handleTapAndHold(element, vi.fn())

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'touchstart',
      expect.any(Function),
      { passive: true }
    )
  })
})
