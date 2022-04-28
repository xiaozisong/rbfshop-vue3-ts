<template>
  <div class="home-category" @mouseleave="active = ''">
    <ul class="menu">
      <li v-for="(item, index) in category.list" :key="index" @mouseenter="changeActive(item.id)" :class="{active: item.id === active}">
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <template v-if="item.children">
          <RouterLink to="/" v-for="sub in item.children.slice(0,2)">{{ sub.name }}</RouterLink>
        </template>
        <template v-else>
          <XtxSkeleton 
          :width="60" 
          :height="20" 
          animated 
          fade
          bg="#ccc" 
          v-for="item in 2" :key="item" 
          style="margin-right: 15px"
          >
          </XtxSkeleton>
        </template>
      </li>
    </ul>
     <!-- 弹层 -->
      <div class="layer">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul>
        <li v-for="goods in arr" :key="goods.id">
          <RouterLink to="/">
            <img :src="goods.picture" alt="">
            <div class="info">
              <p class="name ellipsis-2">{{ goods.name }}</p>
              <p class="desc ellipsis">{{ goods.desc }}</p>
              <p class="price"><i>¥</i>{{ goods.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup name="HomeCategory">
import useStore from '@/store'
import { computed, ref } from 'vue';
const { category } = useStore()
const active = ref<string>('')
const changeActive = (id: string) => {
  if (!id) {
    return 
  }
  active.value = id
}
const arr = computed(() =>  category.list.find(item => item.id === active.value)?.goods)
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;
      &:hover {
        background: @xtxColor;
      }
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
   .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}

    
    
    
</style>
