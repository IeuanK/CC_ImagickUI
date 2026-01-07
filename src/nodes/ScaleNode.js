import { Node } from '@baklavajs/core'
import { NodeInterface } from '@baklavajs/core'
import { initializeImageMagick, ImageMagick, MagickFormat, MagickGeometry } from 'magica'

export default class ScaleNode extends Node {
  type = 'ScaleNode'
  name = 'Scale'

  constructor() {
    super()

    this.addInputInterface('Image', new NodeInterface('Image', null))
    this.addOutputInterface('Image', new NodeInterface('Image', null))

    this.addOption('width', 'NumberOption', 800, undefined, { min: 1, max: 10000 })
    this.addOption('height', 'NumberOption', 600, undefined, { min: 1, max: 10000 })
    this.addOption('maintainAspectRatio', 'CheckboxOption', true)
    this.addOption('scaleMode', 'SelectOption', 'Resize', undefined, {
      items: ['Resize', 'Scale', 'Sample', 'Thumbnail']
    })
    this.addOption('ignoreAspectRatio', 'CheckboxOption', false)
    this.addOption('onlyShrink', 'CheckboxOption', false)
    this.addOption('onlyEnlarge', 'CheckboxOption', false)
    this.addOption('fillArea', 'CheckboxOption', false)
    this.addOption('percentage', 'CheckboxOption', false)
  }

  async calculate() {
    const inputImage = this.getInterface('Image').value

    if (!inputImage || !inputImage.data) {
      return { 'Image': null }
    }

    const width = this.getOptionValue('width')
    const height = this.getOptionValue('height')
    const maintainAspectRatio = this.getOptionValue('maintainAspectRatio')
    const scaleMode = this.getOptionValue('scaleMode')
    const ignoreAspectRatio = this.getOptionValue('ignoreAspectRatio')
    const onlyShrink = this.getOptionValue('onlyShrink')
    const onlyEnlarge = this.getOptionValue('onlyEnlarge')
    const fillArea = this.getOptionValue('fillArea')
    const percentage = this.getOptionValue('percentage')

    try {
      await initializeImageMagick()

      const outputData = await ImageMagick.read(inputImage.data, async (image) => {
        const geometry = new MagickGeometry(width, height)
        geometry.ignoreAspectRatio = ignoreAspectRatio
        geometry.greater = onlyShrink
        geometry.less = onlyEnlarge
        geometry.fillArea = fillArea
        geometry.isPercentage = percentage

        switch (scaleMode) {
          case 'Resize':
            image.resize(geometry)
            break
          case 'Scale':
            image.scale(geometry)
            break
          case 'Sample':
            image.sample(geometry)
            break
          case 'Thumbnail':
            image.thumbnail(geometry)
            break
        }

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
      console.error('Scale error:', error)
      throw error
    }
  }
}
