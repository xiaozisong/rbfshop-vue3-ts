<template>
  <div class="box">

  </div>
</template>

<script setup lang="ts">
// h函数与render函数

import { h, onMounted, render } from 'vue';
// h函数有三个参数，第一个参数是组件或者是HTML结构，第二个参数是一个对象，第三参数是描述信息
// const VNode = h('h1', {}, '我是一个h1标题')

// 为元素添加类名与id等信息
const VNode = h('h1', {id: 'h1Box', className: 'content'}, '我是一个h1标题')
// render 函数有两个参数，一个是需要创建的虚拟DOM，第二个是插入的位置
onMounted(() => {
render(VNode, document.querySelector('.box')!)
})
</script>

<style lang="less" scoped>
// v3中的less的深度选择器是 :deep(类名)
:deep(.content) {
  width: 200px;
  height: 200px;
  background-color: aqua;
}
</style>