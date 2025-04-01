export function downscaleCanvas(canvas: HTMLCanvasElement): Promise<File> {
  return new Promise((resolve, reject) => {
    const tempCanvas = document.createElement('canvas')
    const ctx = tempCanvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Canvas rendering context not available'))
      return
    }

    tempCanvas.width = 64
    tempCanvas.height = 64

    ctx.drawImage(canvas, 0, 0, 64, 64)

    tempCanvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'downscaled-canvas.png', {
          type: 'image/png'
        })
        resolve(file)
      } else {
        reject(new Error('Failed to create Blob from canvas'))
      }
    }, 'image/png')
  })
}
