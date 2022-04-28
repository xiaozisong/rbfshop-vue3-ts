import { defineStore } from "pinia"
import request from '@/utils/request'
import { ApiRes, BannerResult } from '@/types/data'
export default defineStore('home', {
  state(){
    return {
      bannerList: [] as BannerResult[]
    }
  },
  actions: {
    async getBannerList(){
      const res = await request.get<ApiRes<BannerResult[]>>('/home/banner')
      console.log(res.data.result)
      this.bannerList = res.data.result
    }
  },
  getters: {

  }
})