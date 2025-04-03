import { getState } from '@/api/state.get'
import { fetchWithCheck } from '@/utils/fetchWithCheck'
import { describe, expect, test, vi } from 'vitest'

vi.mock('@/utils/fetchWithCheck')

describe('getState', () => {
  test('calls fetchWithCheck and returns the expected state', async () => {
    const mockState = { mock: 'state' }
    const mockResponse = {
      json: vi.fn().mockResolvedValue(mockState)
    } as unknown as Response
    vi.mocked(fetchWithCheck).mockResolvedValue(mockResponse)

    const state = await getState()

    expect(fetchWithCheck).toHaveBeenCalledWith('/state')
    expect(state).toEqual(mockState)
  })
})
