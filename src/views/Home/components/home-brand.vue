<script lang="ts" setup name="HomeBrand">
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
import useStore from '@/store'
import { useLazyLoadData } from '@/utils/hooks';
const { home } = useStore()
const target = useLazyLoadData(home.getBrandList)
</script>

<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证" ref="target">
    <template v-slot:right>
      <a href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
      <div class="box" ref="box">
     <Transition name="fade">
        <ul class="list" v-if="home.brandList.length">
        <li v-for="item in home.brandList" :key="item.id">
          <RouterLink to="/">
            <img v-lazy="item.picture" alt="" />
          </RouterLink>
        </li>
        </ul>
        <HomeSkeleton v-else></HomeSkeleton>
    </Transition>

      </div>
  </HomePanel>
</template>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
