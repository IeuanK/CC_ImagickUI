import { defineNode, NodeInterface } from '@baklavajs/core'

export const InputNode = defineNode({
  type: 'InputNode',
  title: 'Input Image',
  outputs: {
    image: () => new NodeInterface('Image', null)
  },
  state: {
    imageData: null
  },
  onCreate() {
    // Initialize state
    this.state.imageData = null
  },
  async onCalculate() {
    // In v2, we don't have built-in file input
    // We'll need to handle this differently
    return {
      image: this.state.imageData
    }
  }
})
