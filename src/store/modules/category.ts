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
      this.list = res.data.result
      console.log(this.list, '14');
    }
  },
  getters: {

  }
})