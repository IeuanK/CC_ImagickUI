import { Node } from '@baklavajs/core'
import { NodeInterface } from '@baklavajs/core'
import { initializeImageMagick, ImageMagick, MagickFormat } from 'magica'

export default class OutputNode extends Node {
  type = 'OutputNode'
  name = 'Output Image'

  constructor() {
    super()

    this.addInputInterface('Image', new NodeInterface('Image', null))

    this.addOption('filename', 'InputOption', 'output', undefined, {
      component: 'TextInput'
    })
    this.addOption('format', 'SelectOption', 'png', undefined, {
      items: ['png', 'jpg']
    })
    this.addOption('preview', 'ButtonOption', null, undefined, {
      component: 'OutputPreview'
    })

    this.outputImageUrl = null
    this.outputBlob = null
  }

  async calculate() {
    const inputImage = this.getInterface('Image').value

    if (!inputImage || !inputImage.data) {
      this.outputImageUrl = null
      this.outputBlob = null
      return {}
    }

    const filename = this.getOptionValue('filename')
    const format = this.getOptionValue('format')

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

      if (this.outputImageUrl) {
        URL.revokeObjectURL(this.outputImageUrl)
      }

      this.outputBlob = new Blob([outputData], { type: mimeType })
      this.outputImageUrl = URL.createObjectURL(this.outputBlob)

      this.events.update.emit(this)

      return {}
    } catch (error) {
      console.error('Output error:', error)
      throw error
    }
  }

  download() {
    if (!this.outputBlob) {
      alert('No image to download. Run the graph first.')
      return
    }

    const filename = this.getOptionValue('filename')
    const format = this.getOptionValue('format')

    const a = document.createElement('a')
    a.href = this.outputImageUrl
    a.download = `${filename}.${format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
