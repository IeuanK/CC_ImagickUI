import { defineNode, NodeInterface } from '@baklavajs/core'
import { initializeImageMagick, ImageMagick, MagickFormat } from 'magica'

export const OutputNode = defineNode({
  type: 'OutputNode',
  title: 'Output Image',
  inputs: {
    image: () => new NodeInterface('Image', null)
  },
  state: {
    filename: 'output',
    format: 'png',
    outputImageUrl: null,
    outputBlob: null
  },
  async onCalculate() {
    const inputImage = this.inputs.image.value

    if (!inputImage || !inputImage.data) {
      this.state.outputImageUrl = null
      this.state.outputBlob = null
      return {}
    }

    const filename = this.state.filename
    const format = this.state.format

    try {
      await initializeImageMagick()

      const magickFormat = format === 'jpg' ? MagickFormat.Jpeg : MagickFormat.Png
      const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png'

      const outputData = await ImageMagick.read(inputImage.data, async (image) => {
        if (format === 'jpg') {
          image.quality = 90
        }

        return await image.write(magickFormat, (data) => data)
      })

      if (this.state.outputImageUrl) {
        URL.revokeObjectURL(this.state.outputImageUrl)
      }

      this.state.outputBlob = new Blob([outputData], { type: mimeType })
      this.state.outputImageUrl = URL.createObjectURL(this.state.outputBlob)

      return {}
    } catch (error) {
      console.error('Output error:', error)
      throw error
    }
  }
})

// Add download method to the node prototype
OutputNode.prototype.download = function() {
  if (!this.state.outputBlob) {
    alert('No image to download. Run the graph first.')
    return
  }

  const filename = this.state.filename
  const format = this.state.format

  const a = document.createElement('a')
  a.href = this.state.outputImageUrl
  a.download = `${filename}.${format}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
