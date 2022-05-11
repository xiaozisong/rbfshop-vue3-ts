<template>
  <div class="box">
    <button @click="handleClick">点我提示</button>
  </div>
</template>

<script setup lang="ts" name="play">
import XtxConfirm from '@/components/confirm/index'
const handleClick = async () => {
  XtxConfirm({title: 'xx', text: '22'}).then((res) => {
    console.log(res);
  }).catch(() => {
    
  })  
}
</script>

<style scoped>

</style>