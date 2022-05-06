<template>
  <div class="box">

  </div>
</template>

<script setup lang="ts">
import { h, onMounted, render } from 'vue'
import XtxMessage from '@/components/message/message.vue'
// 如果使用h函数来渲染组件的话，需要导入组件，即使你注册了全局组件，那对于h函数来说也是无效的
const VNode = h(XtxMessage, {type: 'success'}, '成功')
onMounted(() => {
  render(VNode, document.querySelector('.box')!)
})
</script>

<style scoped>

</style>