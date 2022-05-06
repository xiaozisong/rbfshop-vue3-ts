<template>
  <div class="xtx-checkbox" @click="handleCheck">
    <i class="iconfont icon-checked" v-if="flag"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <span>提示文本</span>
  </div>
</template>
<script lang="ts" setup name="XtxCheckbox">
import { ref } from 'vue';
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
