<template>
  <AppTopnav></AppTopnav>
  <AppHeader></AppHeader>
  <AppHeaderSticky></AppHeaderSticky>
  <main class="app-body">
    <router-view></router-view>
  </main>
  <AppFooter></AppFooter>
</template>

<script setup lang="ts" name="Layout">
import AppTopnav from './components/app-topnav.vue';
import AppHeader from './components/app-header.vue';
import AppFooter from './components/app-footer.vue';
import AppHeaderSticky from './components/app-header-sticky.vue';
import useStore from '@/store'
const { category } = useStore()
category.getCateList()
</script>

<style lang="less" scoped>
.app-body{
  min-height: 600px;
}
</style>