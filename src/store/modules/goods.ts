import { defineStore } from "pinia";
import { ApiObjRes, GoodsInfo } from '@/types/data'
import http from '@/utils/request'
export default defineStore('goods', {
  state() {
    return {
      // 商品详细信息
    info: {} as GoodsInfo,
    }
  },
  actions: {
    async getGoodsInfo(id: string) {
      const res = await http.get<ApiObjRes<GoodsInfo>>('/goods', {
        params: {
          id,
        },
      })
      this.info = res.data.result
    },
  },  
  getters: {

  },
})