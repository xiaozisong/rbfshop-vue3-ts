<template>
  <div class="home-new" ref="target">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><XtxMore path="/" /></template>
      <Transition name="fade">
        <!-- 面板内容 -->
        <ul class="goods-list" v-if="home.newGoodsList.length">
          <li v-for="item in home.newGoodsList" :key="item.id">
            <RouterLink :to="`/goods/${item.id}`">
              <img
                v-lazy="item.picture"
                alt=""
              />
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else></HomeSkeleton>
      </Transition>
    </HomePanel>
  </div>
</template>
<script lang="ts" setup>
import HomePanel from './home-panel.vue'
import useStore from '@/store'
import { useLazyLoadData } from '@/utils/hooks'
import HomeSkeleton from './home-skeleton.vue'
const { home } = useStore()
const target = useLazyLoadData(home.getNewGoodList)
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
