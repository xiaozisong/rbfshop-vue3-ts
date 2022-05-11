<template>
  <div class="xtx-goods-page" v-if="info.categories">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${info.categories[1].id}`">
          {{ info.categories[1].name }}
        </XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${info.categories[0].id}`">
          {{ info.categories[0].name }}
        </XtxBreadItem>
        <XtxBreadItem>{{ info.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="info.mainPictures"></GoodsImage>
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="info" />
          <GoodsSku :goods="info" :key="info.id" v-if="info.id" skuId="1369155862131642369" @changeSkuId="changeSkuId"></GoodsSku>
          <XtxNumbox v-model="count" :max="10" :min="1" label="数量" @change="change"></XtxNumbox>
          <XtxButton size="middle" type="primary" style="margin-top: 20px; margin-left: 10px;" @click="addCart">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsDetails :goods="info"></GoodsDetails>
          <div class="goods-tabs"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :type="1" />
          <GoodsHot :type="2" />
          <GoodsHot :type="3" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useStore from '@/store'
import GoodsImage from './components/goods-images.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsDetails from './components/goods-detail.vue'
import GoodsHot from './components/goods-hot.vue'
import { storeToRefs } from 'pinia'
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'
import Message from '@/components/message'
import { CartItem } from '@/types/cart'
const { goods, cart, user } = useStore()
const route = useRoute()
watchEffect(() => {
  const id = route.params.id as string
  goods.getGoodsInfo(id)
})

const { info } = storeToRefs(goods)
// 子传父下来的事件
let skuIdParams = ''
const changeSkuId = (skuId: string) => {
  skuIdParams = skuId
  const sku = info.value.skus.find(item => item.id === skuId)
  if (sku) {
    info.value.inventory = sku.inventory
    info.value.price = sku.price
    info.value.oldPrice = sku.oldPrice
  }
}
// 传递给numbox的数据
const count = ref(3)

// 加入购物车
const addCart = async () => {
  if(!skuIdParams) return Message({type: 'warning', text: '请选择完整的商品规格'})
    const sku = info.value.skus.find(item => item.id === skuIdParams)
    const attrsText = sku?.specs.map(item => item.valueName).join(' ')    
    cart.addCart({
    // 本地添加
    id: info.value.id,
    name: info.value.name,
    picture: info.value.mainPictures[0],
    price: info.value.price,
    count: count.value,
    skuId: skuIdParams,
    attrsText,
    selected: true,
    nowPrice: info.value.price,
    stock: info.value.inventory,
    isEffective: true,
  } as CartItem)
  Message({type: 'success', text: '添加购物车成功'})
}

// 子传父，每次NUMbox改变的值，带给父组件
const change = (val: number) => {
  console.log('我是父组件，我拿到了', val);
}
</script>
<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
