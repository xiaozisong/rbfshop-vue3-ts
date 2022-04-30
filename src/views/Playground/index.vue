<template>
  <div style="height: 500px">
  </div>
    <img ref="target" src="https://img2.baidu.com/it/u=127260290,3306316478&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666" alt="">

</template>

<script setup lang="ts">
// import { useIntersectionObserver } from '@vueuse/core';
import {  onMounted, ref } from 'vue'
const img = document.createElement('img')
const target = ref<null | HTMLImageElement>(null) 
// 接收三个参数，第一个参数为监听的元素，第二个参数是一个回调函数，回调函数中接收一个数组作为参数，参数中有一个对象
// const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
//   // 监听元素是否在可视区域内，如果在可视区域内，isIntersecting的值为true，这样可以通过判断这个值来实现图片的懒加载
//   if (isIntersecting) {
//     // 但是每次滚动都会触发监听事件
//     target.value!.src = 'https://img2.baidu.com/it/u=127260290,3306316478&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666'
//     // 一旦赋值就卸载方法
//     stop()
//   }
// })

window.addEventListener('scroll', function() {
  console.log(target.value?.offsetTop, '元素');
  console.log(document.documentElement.offsetTop, 'body');
  
})
</script>

<style scoped>

</style>