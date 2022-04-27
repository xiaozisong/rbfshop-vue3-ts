<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/store'
const { category } = useStore()
category.getCateList()

</script>

<style lang="less" scoped>

</style>