<template>
  <div class="output-preview">
    <div v-if="node.outputImageUrl" class="preview-container">
      <img :src="node.outputImageUrl" alt="Output preview" class="preview-image" />
      <button @click="downloadImage" class="download-button">
        Download
      </button>
    </div>
    <div v-else class="no-preview">
      No preview available. Run the graph to generate output.
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  option: {
    type: Object,
    required: false
  },
  modelValue: {
    required: false
  }
})

const downloadImage = () => {
  props.node.download()
}
</script>

<style scoped>
.output-preview {
  padding: 8px 0;
  min-height: 60px;
}

.preview-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.preview-image {
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
  border: 1px solid #444;
  object-fit: contain;
  background: #1a1a1a;
}

.download-button {
  background: #2196F3;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.download-button:hover {
  background: #1976D2;
}

.download-button:active {
  background: #0D47A1;
}

.no-preview {
  color: #888;
  font-size: 12px;
  font-style: italic;
  text-align: center;
  padding: 20px 8px;
}
</style>
