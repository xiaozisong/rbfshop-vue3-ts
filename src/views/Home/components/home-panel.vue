<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>{{ title }}<small>{{ subTitle }}</small></h3>
        <slot name="right"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup name="HomePanel">
// 父传子接收的第一种方式
// defineProps({
//   title: {
//     type: String,
//     default: '默认大标题'
//   },
//   subTitle: {
//     type: String,
//     default: '默认副标题'
//   }
// })
// 父传子接收的第二种方式
// 接口类型可定义也可不定义
interface IProps {
  title?: string
  subTitle?: string
}
const { title = '默认大标题', subTitle = '默认副标题' } = defineProps<IProps>()
</script>

<style scoped lang="less">
.home-panel {
  background-color: #fff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
