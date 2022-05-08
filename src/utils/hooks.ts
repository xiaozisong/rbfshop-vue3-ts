import { useIntersectionObserver, useIntervalFn } from '@vueuse/core';
import { ref } from 'vue'
export function useLazyLoadData(callback: () => void) {
  const target = ref<null | HTMLImageElement>(null) 
  // 接收三个参数，第一个参数为监听的元素，第二个参数是一个回调函数，回调函数中接收一个数组作为参数，参数中有一个对象
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    // 监听元素是否在可视区域内，如果在可视区域内，isIntersecting的值为true，这样可以通过判断这个值来实现图片的懒加载
    if (isIntersecting) {
      // 但是每次滚动都会触发监听事件
      callback()
      // 一旦赋值就卸载方法
      stop()
    }
  })
  return target
}
// 倒计时
export function useCountDown (cutNum: number = 60) {
  let count = ref(0)
  const { resume, pause } = useIntervalFn(() => {
    count.value--
    if(count.value <= 0) pause()
  }, 1000, { immediate: false })
  
  const start = () => {
    count.value = cutNum
    resume()
  }

  return {
    count,
    start
  }
}