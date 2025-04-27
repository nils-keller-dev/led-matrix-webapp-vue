import { fetchWithCheck } from '@/utils/fetchWithCheck'
import { afterEach } from 'node:test'
import type { MockInstance } from 'vitest'
import { beforeEach, describe, expect, test, vi } from 'vitest'

describe('fetchWithCheck', () => {
  let fetchSpy: MockInstance

  beforeEach(() => {
    fetchSpy = vi.spyOn(global, 'fetch')
  })

  afterEach(() => {
    fetchSpy.mockRestore()
  })

  test('returns response when fetch is successful', async () => {
    const mockResponse = { ok: true }
    fetchSpy.mockResolvedValue(mockResponse as unknown as Response)

    const response = await fetchWithCheck('/test-url')
    expect(response).toBe(mockResponse)
  })

  test('throws an error when fetch response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: 'Not Found'
    }
    fetchSpy.mockResolvedValue(mockResponse as unknown as Response)

    await expect(fetchWithCheck('/test-url')).rejects.toThrow('404 Not Found')
  })

  test('calls fetch with correct URL and options', async () => {
    const mockResponse = {
      ok: true
    }
    fetchSpy.mockResolvedValue(mockResponse as unknown as Response)

    const options = { method: 'POST' }
    await fetchWithCheck('/test-url', options)
    expect(fetchSpy).toHaveBeenCalledWith('api/test-url', options)
  })
})
