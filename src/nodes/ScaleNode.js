import { defineNode, NodeInterface } from '@baklavajs/core'
import { initializeImageMagick, ImageMagick, MagickFormat, MagickGeometry } from 'magica'

export const ScaleNode = defineNode({
  type: 'ScaleNode',
  title: 'Scale',
  inputs: {
    image: () => new NodeInterface('Image', null)
  },
  outputs: {
    image: () => new NodeInterface('Image', null)
  },
  state: {
    width: 800,
    height: 600,
    maintainAspectRatio: true,
    scaleMode: 'Resize',
    ignoreAspectRatio: false,
    onlyShrink: false,
    onlyEnlarge: false,
    fillArea: false,
    percentage: false
  },
  onCreate() {
    this.state.width = 800
    this.state.height = 600
    this.state.maintainAspectRatio = true
    this.state.scaleMode = 'Resize'
    this.state.ignoreAspectRatio = false
    this.state.onlyShrink = false
    this.state.onlyEnlarge = false
    this.state.fillArea = false
    this.state.percentage = false
  },
  async onCalculate() {
    const inputImage = this.inputs.image.value

    if (!inputImage || !inputImage.data) {
      return { image: null }
    }

    const { width, height, scaleMode, ignoreAspectRatio, onlyShrink, onlyEnlarge, fillArea, percentage } = this.state

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
        image: {
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
})
