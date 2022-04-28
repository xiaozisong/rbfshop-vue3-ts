import { defineStore } from "pinia";
import http from '@/utils/request'
import { CateList, CateResType } from "@/types/data"
import { topCategory } from '../constants'
const topCategoryArr = topCategory.map(item => {
  return {
    name: item
  }
})
export default defineStore('category', {
  state(){
    return {
      list: topCategoryArr as CateList
    }
  },
  actions: {
    async getCateList() {
      const res = await http.get<CateResType>('/home/category/head')
      res.data.result.forEach(item => item.open = false) // 为每个元素添加一个open标记，又来控制layer的显示与隐藏
      this.list = res.data.result
      console.log(this.list, '14');
    },
    // 控制弹层显示的action
    show(id: string){
      if (!id) {
        return
      }
      const obj = this.list.find(item => item.id === id)
      obj!.open = true
    },
    // 控制弹层隐藏的action
    hide(id: string){
      const obj = this.list.find(item => item.id === id)
      obj!.open = false
    }
  },
  getters: {

  }
})