<template>
  <div class="file-input-wrapper">
    <input
      type="file"
      accept="image/*"
      @change="handleFileChange"
      ref="fileInput"
      class="file-input"
    />
    <div v-if="fileName" class="file-name">{{ fileName }}</div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: [File, null]
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const fileName = ref('')

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    fileName.value = file.name
    emit('update:modelValue', file)
  }
}

watch(() => props.modelValue, (newValue) => {
  if (!newValue) {
    fileName.value = ''
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
})
</script>

<style scoped>
.file-input-wrapper {
  padding: 4px 0;
}

.file-input {
  width: 100%;
  padding: 6px;
  font-size: 12px;
  border: 1px solid #444;
  border-radius: 3px;
  background: #2d2d2d;
  color: #fff;
  cursor: pointer;
}

.file-input::-webkit-file-upload-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 4px 12px;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 8px;
}

.file-input::-webkit-file-upload-button:hover {
  background: #45a049;
}

.file-name {
  margin-top: 4px;
  font-size: 11px;
  color: #aaa;
  word-break: break-all;
}
</style>
