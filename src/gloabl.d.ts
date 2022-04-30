import XtxSkeleton from '@/components/Skeleton/index.vue'
import XtxCarousel from '@/components/Carousel/index.vue'
import XtxMore from '@/components/More/index.vue'
declare module 'vue' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
    XtxSkeleton: typeof XtxSkeleton
    XtxCarousel: typeof XtxCarousel
    XtxMore: typeof XtxMore
  }
}

export {}