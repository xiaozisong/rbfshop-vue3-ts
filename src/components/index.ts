import { App } from 'vue'
import Skeleton from './Skeleton/index.vue'
import Carousel from './Carousel/index.vue'
import More from './More/index.vue'
import Bread from './Bread/index.vue'
import BreadItem from './Bread/Item.vue'
import { useIntersectionObserver } from '@vueuse/core'
import defaultImg from '@/assets/images/200.png'
export default {
  install(app: App){
    app.component(Skeleton.name, Skeleton)
    app.component(Carousel.name, Carousel)
    app.component(More.name, More)
    app.component('XtxBread', Bread)
    app.component('XtxBreadItem', BreadItem)
    app.directive('lazy', {
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          // 监听元素是否在可视区域内，如果在可视区域内，isIntersecting的值为true，这样可以通过判断这个值来实现图片的懒加载
          if (isIntersecting) {
            // 但是每次滚动都会触发监听事件
            el.src = binding.value
            // 如果图片加载错误
            el.onerror = () => {
              el.src = defaultImg
            }
            // 一旦赋值就卸载方法
            stop()
          }
        }) 
      },
    })
  },
}