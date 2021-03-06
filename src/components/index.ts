import { App } from 'vue'
import Skeleton from './Skeleton/index.vue'
import Carousel from './Carousel/index.vue'
import More from './More/index.vue'
import Bread from './Bread/index.vue'
import BreadItem from './Bread/Item.vue'
import City from './City/index.vue'
import Numbox from './Numbox/index.vue'
import Button from './Button/index.vue'
import Checkbox from './Checkbox/index.vue'
import Message from './message/message.vue'
import Dialog from './Dialog/index.vue'
import XtxTabs from '@/components/tabs/index.vue'
import XtxTabsPane from '@/components/tabs/panel.vue'
import { useIntersectionObserver } from '@vueuse/core'
import defaultImg from '@/assets/images/200.png'
export default {
  install(app: App){
    app.component(Skeleton.name, Skeleton)
    app.component(Carousel.name, Carousel)
    app.component(More.name, More)
    app.component('XtxBread', Bread)
    app.component('XtxBreadItem', BreadItem)
    app.component(City.name, City)
    app.component(Numbox.name, Numbox)
    app.component(Button.name, Button)
    app.component(Checkbox.name, Checkbox)
    app.component(Message.name, Message)
    app.component(Dialog.name, Dialog)
    app.component('XtxTabs', XtxTabs)
    app.component('XtxTabsPane', XtxTabsPane)
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