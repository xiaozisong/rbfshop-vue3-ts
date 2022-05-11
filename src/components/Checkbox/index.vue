<template>
  <div class="xtx-checkbox" @click="handleCheck">
    <i class="iconfont icon-checked" v-if="modelValue"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup name="XtxCheckbox">
// 还没有处理 切换勾选的状态
import { ref } from 'vue';
defineProps<{
  modelValue?: boolean
}>()
const emit = defineEmits<{
  (e: 'handleCheck', val: boolean): void
}>()
const flag = ref(false)
const handleCheck = () => {
  flag.value = !flag.value
  emit('handleCheck', flag.value)
}
</script>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
