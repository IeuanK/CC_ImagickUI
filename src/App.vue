<template>
  <div id="app">
    <NodeEditor />
  </div>
</template>

<script setup>
import NodeEditor from './components/NodeEditor.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
