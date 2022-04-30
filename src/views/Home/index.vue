<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner />
        <!-- 新鲜好物 -->
        <HomeNew></HomeNew>
        <!-- 人气推荐 -->
        <HomeHot></HomeHot>
        <!-- 热门品牌 -->
        <HomeBrand></HomeBrand>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HomeBanner from './components/home-banner.vue'
import HomeCategory from './components/home-category.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import HomeBrand from './components/home-brand.vue'
</script>

<style lang="less" scoped></style>