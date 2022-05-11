import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/assets/styles/common.less'
import router from '@/router'
import { createPinia } from 'pinia'
import XtxUI from '@/components'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
const app = createApp(App)
pinia.use(piniaPluginPersistedstate)
app.use(router).use(XtxUI).use(pinia).mount('#app')
