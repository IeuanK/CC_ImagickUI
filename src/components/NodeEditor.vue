<template>
  <div class="node-editor-container">
    <div class="toolbar">
      <h1>ImageMagick Node Editor</h1>
      <button @click="runGraph" class="run-button">Run</button>
    </div>
    <baklava-editor :view-model="baklava" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Editor } from '@baklavajs/core'
import { ViewPlugin } from '@baklavajs/plugin-renderer-vue'
import { EnginePlugin, Engine } from '@baklavajs/plugin-engine'
import { InterfaceTypePlugin } from '@baklavajs/plugin-interface-types'

import InputNode from '../nodes/InputNode'
import OutputNode from '../nodes/OutputNode'
import BlurNode from '../nodes/BlurNode'
import ScaleNode from '../nodes/ScaleNode'

import FileInput from './node-options/FileInput.vue'
import OutputPreview from './node-options/OutputPreview.vue'

const baklava = new Editor()

const viewPlugin = new ViewPlugin()
viewPlugin.registerOption('FileInput', FileInput)
viewPlugin.registerOption('OutputPreview', OutputPreview)
baklava.use(viewPlugin)

const enginePlugin = new EnginePlugin(true)
baklava.use(enginePlugin)

const intfTypePlugin = new InterfaceTypePlugin()
baklava.use(intfTypePlugin)

baklava.registerNodeType(InputNode)
baklava.registerNodeType(OutputNode)
baklava.registerNodeType(BlurNode)
baklava.registerNodeType(ScaleNode)

const runGraph = async () => {
  try {
    const engine = new Engine(baklava.graph)
    await engine.runOnce()
  } catch (error) {
    console.error('Error running graph:', error)
    alert('Error running graph: ' + error.message)
  }
}

onMounted(() => {
  const inputNode = new InputNode()
  baklava.graph.addNode(inputNode)

  const outputNode = new OutputNode()
  baklava.graph.addNode(outputNode)
})
</script>

<style scoped>
.node-editor-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
}

.toolbar {
  background: #2d2d2d;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #3d3d3d;
}

.toolbar h1 {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}

.run-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.run-button:hover {
  background: #45a049;
}

.run-button:active {
  background: #3d8b40;
}

:deep(.baklava-editor) {
  flex: 1;
  height: calc(100vh - 73px);
}
</style>
