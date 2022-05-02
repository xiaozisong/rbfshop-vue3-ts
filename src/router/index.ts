import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/Layout/index.vue'
export default createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => {
    return {
      top: 0,
    }
  },
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
        },
        {
          path: '/goods/:id',
          component: () => import('@/views/Goods/index.vue')
        }
      ]
    },
    {path: '/login', component: () => import('@/views/Login/index.vue')},
    {path: '/pg', component: () => import('@/views/Playground/index.vue')}

  ]
})