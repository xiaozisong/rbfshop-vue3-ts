<template>
  <div class="goods-sku">
    <dl v-for="spec in goods.specs" :key="spec.id">
        <dt>{{ spec.name }}</dt>
        <dd>
        <template v-for="item in spec.values" :key="item.name">
          <img
            v-if="item.picture"
            :class="{selected: item.selected, disabled: item.disabled}"
            :src="item.picture"
            alt=""
            @click="changeSelected(item, spec)"
          />
          <span v-else :class="{selected: item.selected, disabled: item.disabled}" @click="changeSelected(item, spec)">{{ item.name }}</span>
          </template>
        </dd>
    </dl>
  </div>
</template>
<script setup lang="ts" name="GoodsSku">
import { GoodsInfo } from '@/types/goods'
import bwPowerSet from '@/utils/bwPowerSet'
const props = defineProps<{
  goods: GoodsInfo
  skuId?: string
}>()
const emit = defineEmits<{
  (e: 'changeSkuId', id: string): void
}>()

// ------设置选中商品样式---------------
const changeSelected = (item: any, spec: any) => {
  if(item.disabled) return
  if (item.selected) {
    item.selected = false
  }else {
    spec.values.forEach( (i: any) => {
      i.selected = false
    })
    item.selected = true
  }
  SpecDisabled()
  // 子传父，向父组件传递一个skuId
  const arr = getSelectedSpec()
  // 或者使用过滤掉空字符串，再判断数组长度是否等于props.specs.length即可，如果相等则触发子传父
  if (!arr.includes('')) {
      const key = arr.join('+')
      console.log(pathMap, '47');
      
      console.log(pathMap[key], '48');
      if (pathMap[key][0]) {
        emit('changeSkuId', pathMap[key][0])   
      }else{
        emit('changeSkuId', '')
      }
    }
}
// ----------------- 获取路径字典 -----------------
const getPathMap = () => { // 路径字典返回出去的是一个对象
  const pathMap: any = {}
  const skus = props.goods.skus.filter(sku => sku.inventory > 0) // 将有库存的sku收集到一个数组中
  skus.forEach(sku => { // 遍历有库存的skus中的specs，获取其中的商品规格信息 比如： 蓝色，中国，20cm
   const arr =  sku.specs.map(spec => spec.valueName) // 收集到一个数组中, 我们要是使用收集到的数组来求出路径字典
   const sets = bwPowerSet(arr)    // 得到子集
   sets.forEach(set => {
     const key = set.join('+') // 设置路径字典的key  黑色+中国
     if (pathMap[key]) { // 判断路径字典中是否已经存在key
       pathMap[key].push(sku.id) // 如果有，则将skuid存给对应的属性中
     }else {
       pathMap[key] = [sku.id] // 没有的话，则新开一个空数组，将skuid存放到属性中
     }
   })
  })
  return pathMap
}

// 每次点击商品规格，都将信息存放到一个数组中，再将这个数组处理成路径字典中的key的形式，每次点击后再去路径字典中查找有没有对应的数据
const getSelectedSpec = () => {
  const arr: string[] = []
  props.goods.specs.forEach((spec, index) => {
    const btn = spec.values.find(btnObj => btnObj.selected) // 找到被选中的那一项
      if (btn) {
        arr[index] = btn.name
      }else{
        arr[index] = ''
      }
  })
  return arr
}

const pathMap = getPathMap()
// 查看被禁用的商品
const SpecDisabled = () => { 
  const arr = getSelectedSpec() // 拿到点击商品信息拼成的数组
  props.goods.specs.forEach((spec, index) => {  // 遍历specs，外层的index控制行数，内层的index控制列数
    spec.values.forEach(btnObj => { // 遍历每一项的values
    const newArr = [...arr] // 不操作原数据，转存一份儿新数据
    newArr[index] = btnObj.name  // 模拟子集 ['黑色', '', ''] ['', '30cm', ''] ['', '', '中国'] 每次点击之后，都会将对应的spec的name添加到对应的位置
    const key = newArr.filter(v => v).join('+')
      if (pathMap[key]) { // 查看values每一项的name属性是否存在与字典中
        btnObj.disabled = false // 存在则不禁用
      }else{ 
        btnObj.disabled = true // 不存在直接禁用
      }
    })
  })
}
SpecDisabled()
// 查找被选中的商品
const defaultSelected = () => {
  const sku = props.goods.skus.find(sku => sku.id === props.skuId)
  if (sku) {
  props.goods.specs.forEach(spec => {
    spec.values.forEach(v => {
      sku.specs.forEach(item => {
        if (v.name === item.valueName) {
          v.selected = true
        }
      })
    })
  })
 }
}
defaultSelected()

</script> 

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>

