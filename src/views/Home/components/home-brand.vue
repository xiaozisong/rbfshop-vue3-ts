<script lang="ts" setup name="HomeBrand">
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
import useStore from '@/store'
import { useLazyLoadData } from '@/utils/hooks';
import { ref } from 'vue';
const { home } = useStore()
const target = useLazyLoadData(home.getBrandList)
const index = ref(0)
const prev = () => {
  if(index.value === 0) return
  index.value--
}
const next = () => {
  if(index.value === Math.ceil(home.brandList.length / 5 -1 )) return
  index.value++
}
</script>

<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证" ref="target">
    <template v-slot:right>
      <a href="javascript:;" :class="{disabled: index === 0}" class="iconfont icon-angle-left prev" @click="prev" ></a>
      <a href="javascript:;" :class="{disabled: index === Math.ceil(home.brandList.length / 5 -1 )}" class="iconfont icon-angle-right next" @click="next" ></a>
    </template>
      <div class="box" ref="box">
     <Transition name="fade">
        <ul class="list" v-if="home.brandList.length" :style="{transform:`translateX(${-index * 1024}px)`, width: `${Math.ceil(home.brandList.length / 5 -1 ) * 1240}px`}">
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
