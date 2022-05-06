<template>
  <div class="box">
    <button @click="clickFn">按钮，点我弹message</button>
  </div>
</template>

<script setup lang="ts" name="play">
import Message from '@/components/message/index'
const clickFn = () => {
  Message({type: 'error', text: 'hhh', duration: 2000})
}
</script>

<style scoped>

</style>