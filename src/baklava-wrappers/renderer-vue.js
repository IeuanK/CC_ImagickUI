// This file imports the UMD build and re-exports
import '@baklavajs/plugin-renderer-vue/dist/index.js'

const BaklavaRendererVue = window.BaklavaJSRendererVue || {}

export const { ViewPlugin } = BaklavaRendererVue
export default BaklavaRendererVue
