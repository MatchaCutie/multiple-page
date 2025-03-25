import { createApp } from 'vue'
import App from '../../src/views/welcome/index.vue'

console.log('aaaa')
console.log(import.meta)

const app = createApp(App)

app.mount('#app')
