import { defineNode, NodeInterface } from '@baklavajs/core'
import { initializeImageMagick, ImageMagick, MagickFormat } from 'magica'

export const BlurNode = defineNode({
  type: 'BlurNode',
  title: 'Blur',
  inputs: {
    image: () => new NodeInterface('Image', null)
  },
  outputs: {
    image: () => new NodeInterface('Image', null)
  },
  state: {
    radius: 0,
    sigma: 1,
    channel: 'All'
  },
  onCreate() {
    this.state.radius = 0
    this.state.sigma = 1
    this.state.channel = 'All'
  },
  async onCalculate() {
    const inputImage = this.inputs.image.value

    if (!inputImage || !inputImage.data) {
      return { image: null }
    }

    const radius = this.state.radius
    const sigma = this.state.sigma

    try {
      await initializeImageMagick()

      const outputData = await ImageMagick.read(inputImage.data, async (image) => {
        image.blur(radius, sigma)
        return await image.write(MagickFormat.Png, (data) => data)
      })

      return {
        image: {
          data: outputData,
          filename: inputImage.filename,
          type: 'image/png'
        }
      }
    } catch (error) {
      console.error('Blur error:', error)
      throw error
    }
  }
})
