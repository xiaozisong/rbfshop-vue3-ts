import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/Layout/index.vue'
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {path: '/', component: Layout},
    {path: '/login', component: () => import('@/views/Login/index.vue')}
  ]
})