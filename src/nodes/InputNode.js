import { Node } from '@baklavajs/core'
import { NodeInterface } from '@baklavajs/core'

export default class InputNode extends Node {
  type = 'InputNode'
  name = 'Input Image'

  constructor() {
    super()

    this.addOutputInterface('Image', new NodeInterface('Image', null))

    this.addOption('file', 'InputOption', null, undefined, {
      component: 'FileInput'
    })

    this.imageData = null
  }

  async calculate() {
    const fileInput = this.getOptionValue('file')

    if (fileInput && fileInput instanceof File) {
      const arrayBuffer = await fileInput.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)

      this.imageData = {
        data: uint8Array,
        filename: fileInput.name,
        type: fileInput.type
      }

      return {
        'Image': this.imageData
      }
    }

    return {
      'Image': this.imageData
    }
  }
}
