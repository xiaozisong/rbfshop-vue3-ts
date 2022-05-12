<template>
  <div class="box">
    <button @click="handleClick">点我提示</button>
    <!-- 传送门组件：可以将一段结构放到to指定的结构中 -->
    <teleport to='body'>
      <!-- 
        fixed属性，默认是相对于浏览器的，但是当祖先元素中设置了transform属性，
        那么fixed就会相对于设置了transform属性的最近的祖先元素
      -->
      <XtxDialog title="收货地址" v-model:DialogVisibel="visible">
      <template>
        sss
      </template>
      <template #footer>
        <XtxButton type="gray" style="margin-right: 20px">取消</XtxButton>
        <XtxButton type="primary">确认</XtxButton>
      </template>
    </XtxDialog>
    </teleport>
  </div>
</template>

<script setup lang="ts" name="play">
import { ref } from 'vue';

const visible = ref(false)
const handleClick = () => {
  visible.value = true
}
</script>

<style scoped>

</style>