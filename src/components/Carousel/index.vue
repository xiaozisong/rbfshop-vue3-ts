<template>
  <div class="xtx-carousel"  @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <li class="carousel-item" :class="{fade: activeIndex === index}" v-for="(item, index) in slides" :key="item.id">
        <RouterLink to="/">
          <img
            :src="item.imgUrl"
            alt=""
          />
        </RouterLink>
      </li>
    </ul>
    <a @click="prev" href="javascript:;" class="carousel-btn prev"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a @click="next" href="javascript:;" class="carousel-btn next"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator">
      <span :class="{active: activeIndex === index}" v-for="(item, index) in slides" :key="item.id" @mouseenter="activeIndex = index"></span>
    </div>
  </div>
</template>

<script lang="ts" setup name="XtxCarousel">
import { BannerResult } from '@/types/data'
import { onMounted, onUnmounted, ref } from 'vue';
// 定义轮播组件接收的类型
interface IProps {
  slides: BannerResult[]
  duration?: number
  autoPlay?: boolean
}
const { slides, duration = 2000, autoPlay = false } = defineProps<IProps>() // 使用泛型方式
// 定义索引，轮播使用
const activeIndex = ref(0)
// 上一张
const prev = () => {
  if (activeIndex.value === 0) {
    activeIndex.value = slides.length - 1
  }
  activeIndex.value--
}
// 下一张
const next = () => {
if (activeIndex.value >= slides.length - 1) {
    activeIndex.value = 0
  }
  activeIndex.value++
}
// 定义timerId，用来清除定时器
let timerId: number = -1
// 鼠标悬停 暂停轮播
const stop = () => {
  clearInterval(timerId)
}
// 鼠标移出 开始轮播
const start = () => {
  if (!autoPlay) return // 如果没传autoPlay属性，暂停轮播
  clearInterval(timerId) // 先清除一下定时器，以免定时器残留
  timerId = window.setInterval(() => {
    next()
  }, duration)
}
// 进入页面自动开启轮播
onMounted(() => {
  start()
})
// 组件销毁时卸载定时器
onUnmounted(() => {
  stop()
})
</script>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>