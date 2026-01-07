<template>
  <div class="node" :class="classes">
    <div class="__title" @pointerdown.self="startDrag">
      <div class="__title-label">{{ node.title }}</div>
      <button class="__menu" @click.prevent="showContextMenu">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </button>
    </div>

    <div class="__content">
      <div class="__inputs">
        <div v-for="input in node.inputs" :key="input.id" class="__port">
          <component
            :is="getComponent('nodeInterface')"
            :node="node"
            :intf="input"
          />
        </div>
      </div>

      <div class="__options">
        <div v-for="option in node.options" :key="option.name" class="__option">
          <component
            :is="getComponent('nodeOption', option.optionComponent)"
            :node="node"
            :option="option"
            :modelValue="option.value"
            @update:modelValue="option.value = $event"
          />
        </div>
      </div>

      <OutputPreview :node="node" />

      <div class="__outputs">
        <div v-for="output in node.outputs" :key="output.id" class="__port">
          <component
            :is="getComponent('nodeInterface')"
            :node="node"
            :intf="output"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Components } from '@baklavajs/renderer-vue'
import OutputPreview from './node-options/OutputPreview.vue'

const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

const classes = computed(() => ({
  '--selected': props.selected,
  '--two-column': false
}))

const getComponent = (type, name) => {
  if (name) {
    return Components.getComponent(type, name)
  }
  return Components.getComponent(type)
}

const startDrag = (event) => {
  emit('select')
}

const showContextMenu = (event) => {
}
</script>

<style scoped>
.node {
  background: #2d2d2d;
  border: 2px solid #3d3d3d;
  border-radius: 8px;
  min-width: 200px;
  max-width: 400px;
  color: #fff;
}

.node.--selected {
  border-color: #4CAF50;
}

.__title {
  background: #3d3d3d;
  padding: 8px 12px;
  border-radius: 6px 6px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: move;
  user-select: none;
}

.__title-label {
  font-weight: 600;
  font-size: 14px;
}

.__menu {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
}

.__menu:hover {
  color: #fff;
}

.__menu svg {
  fill: currentColor;
}

.__content {
  padding: 12px;
}

.__inputs,
.__outputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}

.__options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}

.__option {
  font-size: 13px;
}

.__port {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
