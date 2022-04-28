import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/assets/styles/common.less'
import router from '@/router'
import { createPinia } from 'pinia'
import XtxUI from '@/components'
const pinia = createPinia()
const app = createApp(App)
app.use(router).use(XtxUI).use(pinia).mount('#app')
