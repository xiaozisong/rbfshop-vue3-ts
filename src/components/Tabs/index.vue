<script setup lang="tsx" name="XtxTabs">
import { useSlots, VNode, RendererNode, RendererElement, provide, toRefs } from 'vue'
const slots = useSlots()
const arr: any = slots?.default?.()
const panels: any = []
arr.forEach((item: any) => {
  if (item.type.name === 'XtxTabsPane') {
    panels.push(item)
  }else{
    if (item.children?.length) {
      item.children.forEach((panel: any) => {
        if (panel.type.name === 'XtxTabsPane') {
          panels.push(panel)
        }
      })
    }
  }
})
const props = defineProps({
  modelValue : {
    type: String,
    default: 'all'
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'tab-click', v: any, index: number): void
  }>()
const clickFn = (name: string, item:any, index: number) => {
  emit('update:modelValue', name)
  emit('tab-click', item, index)
}
const { modelValue  } = toRefs(props)
provide('activeName', modelValue)
const VTabs = () => {
  const navs = (
    <nav>
      {panels?.map((item: any, index: number) => <a href="javascript:;" onClick={() => clickFn(item?.props?.name, item, index)} class={{active: props.modelValue === item?.props?.name}}>{ item?.props?.label }</a>)}
    </nav>
  )
  return <div class="xtx-tabs">{[navs, panels]}</div>
}
</script>

<template>

    <VTabs></VTabs>
</template>

<style lang="less">
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
