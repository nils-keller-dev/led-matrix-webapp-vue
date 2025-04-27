import { fetchColorName } from '@/utils/fetchColorName'
import { describe, expect, test, vi } from 'vitest'

describe('fetchColorName', () => {
  test('returns cached color name if available', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch')
    const mockColorData = { name: { value: 'Red' } }
    const mockJsonFn = vi.fn().mockResolvedValue(mockColorData)

    fetchSpy.mockResolvedValue({
      json: mockJsonFn
    } as unknown as Response)

    const hex = '#ff0000'
    const firstResult = await fetchColorName(hex)

    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(mockJsonFn).toHaveBeenCalledTimes(1)
    expect(firstResult).toBe('Red')
    expect(fetchSpy).toHaveBeenCalledWith(
      `https://www.thecolorapi.com/id?hex=ff0000`
    )

    fetchSpy.mockClear()
    mockJsonFn.mockClear()

    const secondResult = await fetchColorName(hex)

    expect(fetchSpy).not.toHaveBeenCalled()
    expect(mockJsonFn).not.toHaveBeenCalled()
    expect(secondResult).toBe('Red')

    fetchSpy.mockRestore()
  })
})
