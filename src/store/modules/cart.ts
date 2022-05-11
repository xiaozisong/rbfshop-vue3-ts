import { defineStore } from 'pinia'
import http from '@/utils/request'
import { ApiRes } from '@/types/data'
import { CartItem } from '@/types/cart'
import useStore from '@/store'
export default defineStore('cart', {
  state(){
    return {
      list: [] as CartItem[]
    }
  },
  actions: {
    // 添加购物车
    async addCart (data: CartItem) {
      if(this.isLogin) {
        const { skuId, count } = data
        await http.post('/member/cart', {skuId, count})
      } else {
        this.list.unshift(data!)
      }
    },
    // 获取购物车列表
    async getCartList () {
      const res = await http.get<ApiRes<CartItem>>('/member/cart')
      this.list = res.data.result
    },
    // 删除购物车中的单个商品
    async delCart(ids: string[], clearAll: boolean, clearInvalid: boolean){
      if (this.isLogin) {
        await http.delete('/member/cart', {
          data: {
            ids,
            clearAll,
            clearInvalid
          }
        })
      }else{
        this.list = this.list.filter(item => !ids.includes(item.skuId))
      }
      this.getCartList()
    },
    // 更改购物车商品的状态
    async updateCart (id: string, data:{ selected?: boolean, count?: number }) {
      if (this.isLogin) {
        await http.put('/member/cart/' + id, data)
      }else{
        const sku = this.list.find(item => item.skuId === id)
        if (sku) {
          if (data.selected !== undefined) {
            sku.selected = data.selected
          }
          if (data.count !== undefined) {
            sku.count = data.count
          }
        }
      }
      this.getCartList()
    },
    // 反选或全选
    async changeAllSelected (selected: boolean) {
      if (this.isLogin) {
        await http.put('/member/cart/selected', {selected})
      } else {
        this.list.forEach(item => item.selected = selected)
      }
      this.getCartList()
    },
    // 清空购物车
    clearCart () {
      this.list = []
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
      return this.isEffective.reduce((sum, item) => (item.count * +item.nowPrice) + sum, 0)
    },
    // 全选反选
    isCheckAll (): boolean {
      if(!this.isEffective.length) return false
      return this.isEffective.every(item => item.selected)
    },
    // 计算已选商品数量
    getIsEffectiveGoodsCount (): number {
      return this.isEffective.filter(item => item.selected).reduce((sum, item) => sum + +item.count, 0)
    },
    // 计算已选商品的总价格
    getIsEffectiveCheckGoodsTotalPrice (): number {
      return this.isEffective.filter(item => item.selected).reduce((sum, item) => sum + +item.nowPrice, 0)
    },
    // 判断用户是否登录
    isLogin () :boolean {
      const { user } = useStore()
      return !!user.profile.token
    }
  }
})