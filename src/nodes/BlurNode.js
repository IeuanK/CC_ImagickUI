import { Node } from '@baklavajs/core'
import { NodeInterface } from '@baklavajs/core'
import { initializeImageMagick, ImageMagick, MagickFormat } from 'magica'

export default class BlurNode extends Node {
  type = 'BlurNode'
  name = 'Blur'

  constructor() {
    super()

    this.addInputInterface('Image', new NodeInterface('Image', null))
    this.addOutputInterface('Image', new NodeInterface('Image', null))

    this.addOption('radius', 'NumberOption', 0, undefined, { min: 0, max: 100 })
    this.addOption('sigma', 'NumberOption', 1, undefined, { min: 0, max: 100 })
    this.addOption('channel', 'SelectOption', 'All', undefined, {
      items: ['All', 'Red', 'Green', 'Blue', 'Alpha', 'Composite']
    })
  }

  async calculate() {
    const inputImage = this.getInterface('Image').value

    if (!inputImage || !inputImage.data) {
      return { 'Image': null }
    }

    const radius = this.getOptionValue('radius')
    const sigma = this.getOptionValue('sigma')
    const channel = this.getOptionValue('channel')

    try {
      await initializeImageMagick()

      const outputData = await ImageMagick.read(inputImage.data, async (image) => {
        image.blur(radius, sigma)

        return await image.write(MagickFormat.Png, (data) => data)
      })

      return {
        'Image': {
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
}
