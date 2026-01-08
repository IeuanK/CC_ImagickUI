// Configure magica WASM path before any imports
import './magica-config'

import { createApp } from 'vue'
import App from './App.vue'
import '@baklavajs/themes/dist/syrup-dark.css'

createApp(App).mount('#app')
