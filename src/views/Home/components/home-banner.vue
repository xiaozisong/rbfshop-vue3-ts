<template>
  <div class="home-banner">
    <!-- 轮播图 -->
    <XtxCarousel :slides="home.bannerList" autoPlay :dutation="1000"></XtxCarousel>
  </div>
</template>
<script lang="ts" setup>
import useStore from '@/store'
const { home } = useStore()
home.getBannerList()
</script>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  background-color: pink;
  :deep(.carousel-btn.prev){
    left: 270px !important;
  }
  :deep(.carousel-indicator){
    padding-left: 270px;
  }
}
</style>