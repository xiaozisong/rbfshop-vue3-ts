import { App } from 'vue'
import Skeleton from './Skeleton/index.vue'
import Carousel from './Carousel/index.vue'
export default {
  install(app: App){
    app.component(Skeleton.name, Skeleton)
    app.component(Carousel.name, Carousel)
  }
}