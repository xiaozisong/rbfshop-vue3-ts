import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/Layout/index.vue'
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/', 
      component: Layout,
      children: [
        {
          path: '/',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: '/category/:id',
          component: () => import('@/views/Category/index.vue')
        },
        {
          path: '/category/sub/:id',
          component: () => import('@/views/Category/sub.vue')
        }
      ]
    },
    {path: '/login', component: () => import('@/views/Login/index.vue')}
  ]
})