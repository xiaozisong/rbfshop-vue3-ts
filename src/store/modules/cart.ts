import { defineStore } from 'pinia'
import http from '@/utils/request'
import { ApiRes } from '@/types/data'
import { CartItem } from '@/types/cart'
export default defineStore('cart', {
  state(){
    return {
      list: [] as CartItem[]
    }
  },
  actions: {
    // 添加购物车
    async addCart (skuId: string, count: number) {
      await http.post('/member/cart', {skuId, count})
    },
    // 获取购物车列表
    async getCartList () {
      const res = await http.get<ApiRes<CartItem>>('/member/cart')
      this.list = res.data.result
    },
    // 删除购物车中的单个商品
    async delCart(ids: string[], clearAll: boolean, clearInvalid: boolean){
      await http.delete('/member/cart', {
        data: {
          ids,
          clearAll,
          clearInvalid
        }
      })
      this.getCartList()
    }
  },
  getters: {
    // 获取有效商品列表
    isEffective (): CartItem[] {
      return this.list.filter(item => item.isEffective && item.stock > 0)
    },
    // 获取总数量
    getIsEffectiveTotalCount (): number {
      return this.isEffective.reduce((sum, item) => item.count + sum, 0)
    },
    // 计算总价格
    getIsEffectiveTotalPrice (): number {
      return this.isEffective.reduce((sum, item) => item.count * +item.nowPrice + sum, 0)
    }
  }
})