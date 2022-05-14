<script lang="ts" setup name="play">
import { ref } from 'vue';
// 订单状态
const orderStatus = [
  { name: 'all', label: '全部订单' },
  { name: 'unpay', label: '待付款' },
  { name: 'deliver', label: '待发货' },
  { name: 'receive', label: '待收货' },
  { name: 'comment', label: '待评价' },
  { name: 'complete', label: '已完成' },
  { name: 'cancel', label: '已取消' }
]
const activeName = ref('all')
const handleClick = (item: any, index: number) => {
  console.log(item, index);
}
</script>
<template>
  <XtxTabs v-model="activeName" @tab-click="handleClick">
    <XtxTabsPane v-for="item in orderStatus" :key="item.name" :name="item.name" :label="item.label"><h1>{{item.label}}</h1></XtxTabsPane>
  </XtxTabs>
</template>
<style scoped>
#headerH1 {
  color: aliceblue;
  background-color: red;
  height: 300px;
  width: 300px;
}
</style>