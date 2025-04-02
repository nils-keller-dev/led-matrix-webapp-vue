import { patchState } from '@/api/state.patch'
import type { State } from '@/constants/interfaces/State'
import { fetchWithCheck } from '@/utils/fetchWithCheck'
import { describe, expect, test, vi } from 'vitest'

vi.mock('@/utils/fetchWithCheck')

describe('patchState', () => {
  test('calls fetchWithCheck with correct arguments', async () => {
    const mockState: Partial<State> = { global: { brightness: 100 } }
    const mockResponse = { success: true } as unknown as Response
    vi.mocked(fetchWithCheck).mockResolvedValue(mockResponse)

    const response = await patchState(mockState)

    expect(fetchWithCheck).toHaveBeenCalledWith('/state', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mockState)
    })
    expect(response).toEqual(mockResponse)
  })
})
