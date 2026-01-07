// This file imports the UMD build and re-exports the named exports
import '@baklavajs/core/dist/index.js'

// The UMD build assigns to window.BaklavaJS or module.exports
const BaklavaCore = window.BaklavaJS || {}

export const { Node, NodeInterface, NodeOption, Editor, Connection, DummyConnection, NodeBuilder } = BaklavaCore
export default BaklavaCore
