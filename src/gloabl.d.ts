import XtxSkeleton from '@/components/Skeleton/index.vue'
declare module 'vue' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
    XtxSkeleton: typeof XtxSkeleton
  }
}

export {}