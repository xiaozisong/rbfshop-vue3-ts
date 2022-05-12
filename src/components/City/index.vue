<template>
  <div class="xtx-city">
    <div class="select" :class="{active: active}" @click="changeActive">
      <span class="placeholder" v-if="defaultAddress?.length">{{ defaultAddress[0] }}</span>
      <span class="placeholder" v-else>请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active" ref="target">
      <span class="ellipsis" v-for="city in areaList" :key="city.code" @click="selectArea(city)">{{ city.name }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup name="XtxCity">
import { ref, watchEffect } from 'vue';
import { onClickOutside } from '@vueuse/core'
import axios  from 'axios'
import { AreaList, Address } from '@/types/city'

defineProps<{
  defaultAddress?: string[] | string
}>()
// 子传父 ts版本
const emit = defineEmits<{
  (e: 'changeAddress', address:Address):void
}>()
const active = ref(false)
const changeActive = () => {
  active.value = !active.value
}
// 点击窗口外的地方，关闭窗口
const target = ref(null)
onClickOutside(target, () => {
  active.value = false
})
// 发送请求获取城市数据
const areaList = ref<AreaList[]>([])
// 备份数据，用来在关闭选择框时恢复数据
const resetList = ref<AreaList[]>([])
const getAreaList = async () => {
  const res = await axios.get<AreaList[]>('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json ')
  areaList.value = res.data
  resetList.value = res.data
}
getAreaList()
// 选择省市区
// 选择城市
const changeResult = ref<Address>({
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  countyCode: '',
  countyName: ''
})
const selectArea = (city: AreaList) => {
  areaList.value = city.areaList
  if (city.level === 0) {
    changeResult.value.provinceCode = city.code
    changeResult.value.provinceName = city.name
  }
  if (city.level === 1) {
    changeResult.value.cityCode = city.code
    changeResult.value.cityName = city.name
  }
  if (city.level === 2) {
    changeResult.value.countyCode = city.code
    changeResult.value.countyName = city.name
    emit('changeAddress', changeResult.value)
    active.value = false
  }
  watchEffect(() => {
    if (!active.value) {
      areaList.value = resetList.value
    }
  })
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
