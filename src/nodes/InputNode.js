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
  async onCalculate() {
    return {
      image: this.state.imageData
    }
  }
})
