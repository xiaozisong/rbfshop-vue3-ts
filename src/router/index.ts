import { createRouter, createWebHashHistory, useRouter } from 'vue-router'
import Layout from '@/Layout/index.vue'
import useStore from '@/store'
import Confirm from '@/components/Confirm'
const router =  createRouter({
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
          path: '/product/:id',
          component: () => import('@/views/Goods/index.vue')
        },
        {
          path: '/cart',
          component: () => import('@/views/cart/index.vue')
        },
        {
          path: '/member/checkout',
          component: () => import('@/views/member/pay/checkout.vue')
        },
        {
          path: '/member/pay',
          component: () => import('@/views/member/pay/index.vue')
        },
        {
          path: '/pay/callback',
          component: () => import('@/views/member/pay/callback.vue')
        },
        {
          path: '/member',
          component: () => import('@/views/member/layout/index.vue'),
          children: [
            {
              path: '',
              component: () => import('@/views/Member/home/index.vue')
            },
            {
              path: 'order',
              component: () => import('@/views/Member/order/index.vue')
            }
          ]
        }
      ]
    },
    {path: '/login', component: () => import('@/views/Login/index.vue')},
    {path: '/pg', component: () => import('@/views/Playground/index.vue')},
    {
      path: '/login/callback',
      component: () => import('@/views/login/callback.vue')
    }
  ],
})
router.beforeEach((to, from, next) => {
  const { cart } = useStore()
  if (cart.isLogin) {
    next()
  } else {
    if (to.path.includes('/member')) {
      Confirm({title: '温馨提示', text: '亲~您还有登录哦'}).then(() => {
        next({
          path: '/login',
          query: {
            redirectUrl: to.fullPath
          }
        })
      }).catch(() => {})
    }else{
      next()
    }
  }
})
export default router