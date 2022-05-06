<template>
  <div class="xtx-numbox" @click="changeFn">
    <div class="label">{{ label }}</div>
    <div class="numbox">
      <a href="javascript:;" @click="sub">-</a>
      <input type="text" readonly :value="modelValue"/>
      <a href="javascript:;" @click="add">+</a>
    </div>
  </div>
</template>
<script lang="ts" setup name="XtxNumbox">
const props = defineProps({ // 接收父组件传递下来的count
  modelValue: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 10
  },
  min: {
    type: Number,
    default: 1
  },
  label: {
    type: String,
    default: ''
  }
})

// 因为vue3中丢弃了.sync，所以在vue3中接收和更改数据的属性名都叫modelValue
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>()
// 发送自定义事件，在子组件中直接更新父组件中的数据, 加的操作
const add = () => {
  if(props.modelValue > props.max) return
  emit('update:modelValue', props.modelValue + 1)
}
// 减得操作 
const sub = () => {
  if(props.modelValue < props.min) return
  emit('update:modelValue', props.modelValue - 1)
}
const changeFn = () => {
  console.log(1);
  
  emit('change', props.modelValue)
}
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
