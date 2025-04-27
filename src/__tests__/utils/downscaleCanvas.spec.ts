import { downscaleCanvas } from '@/utils/downscaleCanvas'
import { describe, expect, test, vi } from 'vitest'

describe('downscaleCanvas', () => {
  test('downscales canvas to 64x64', async () => {
    const mockContext = { drawImage: vi.fn() }
    const mockCanvas = {
      getContext: vi.fn().mockReturnValue(mockContext),
      width: 0,
      height: 0,
      toBlob: vi.fn((callback) =>
        callback(new Blob(['data'], { type: 'image/png' }))
      )
    } as unknown as HTMLCanvasElement

    vi.spyOn(document, 'createElement').mockReturnValue(mockCanvas)

    const inputCanvas = {
      width: 200,
      height: 150
    } as HTMLCanvasElement

    const result = await downscaleCanvas(inputCanvas)

    expect(mockCanvas.width).toBe(64)
    expect(mockCanvas.height).toBe(64)
    expect(mockContext.drawImage).toHaveBeenCalledWith(
      inputCanvas,
      0,
      0,
      64,
      64
    )
    expect(result.name).toBe('downscaled-canvas.png')
    expect(result.type).toBe('image/png')
  })

  test('rejects when canvas context is not available', () => {
    const mockCanvas = {
      getContext: vi.fn().mockReturnValue(null)
    } as unknown as HTMLCanvasElement

    vi.spyOn(document, 'createElement').mockReturnValue(mockCanvas)

    const result = downscaleCanvas({} as unknown as HTMLCanvasElement)
    expect(result).rejects.toThrow('Canvas rendering context not available')
  })

  test('rejects when blob creation fails', () => {
    const mockCanvas = {
      getContext: vi.fn().mockReturnValue({ drawImage: vi.fn() }),
      toBlob: vi.fn((callback) => callback(null))
    } as unknown as HTMLCanvasElement

    vi.spyOn(document, 'createElement').mockReturnValue(mockCanvas)

    const result = downscaleCanvas({} as unknown as HTMLCanvasElement)
    expect(result).rejects.toThrow('Failed to create Blob from canvas')
  })
})
