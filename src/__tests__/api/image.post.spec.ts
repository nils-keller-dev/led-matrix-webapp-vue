import { postImage } from '@/api/image.post'
import { fetchWithCheck } from '@/utils/fetchWithCheck'
import { describe, expect, test, vi } from 'vitest'

vi.mock('@/utils/fetchWithCheck')

describe('postImage', () => {
  test('calls fetchWithCheck with correct arguments', async () => {
    const mockResponse = { success: true } as unknown as Response
    vi.mocked(fetchWithCheck).mockResolvedValue(mockResponse)

    const mockImage = new File([''], 'image.png')

    const response = await postImage(mockImage)

    expect(fetchWithCheck).toHaveBeenCalledWith('/image', {
      method: 'POST',
      body: expect.any(FormData)
    })
    expect(response).toEqual(mockResponse)
  })
})
