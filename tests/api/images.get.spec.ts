import { getImages } from '@/api/images.get'
import { fetchWithCheck } from '@/utils/fetchWithCheck'
import { describe, expect, test, vi } from 'vitest'

vi.mock('@/utils/fetchWithCheck')

describe('getImages', () => {
  test('calls fetchWithCheck and returns the images', async () => {
    const mockState = { images: ['image1.png', 'image2.png'] }
    const mockResponse = {
      json: vi.fn().mockResolvedValue(mockState)
    } as unknown as Response
    vi.mocked(fetchWithCheck).mockResolvedValue(mockResponse)

    const state = await getImages()

    expect(fetchWithCheck).toHaveBeenCalledWith('/images')
    expect(state).toEqual(mockState.images)
  })
})
