import { defineStore } from 'pinia'
import http from '@/utils/request'
import { ApiObjRes, ApiRes } from '@/types/data'
import { CartItem } from '@/types/cart'
import useStore from '@/store'
export default defineStore('cart', {
  state(){
    return {
      list: [] as CartItem[]
    }
  },
  persist: {
    key: 'rbf-cart-list'
  },
  actions: {
    // 添加购物车
    async addCart (data: CartItem) {
      if(this.isLogin) {
        const { skuId, count } = data
        await http.post('/member/cart', {skuId, count})
      } else {
        const sku = this.list.find(item => item.skuId === data.skuId)
        if (sku) {
          sku.count+=data.count
        } else {
          this.list.unshift(data!)
        }
      }
      this.getCartList()
    },
    // 获取购物车列表
    async getCartList () {
      if (this.isLogin) {
        const res = await http.get<ApiRes<CartItem>>('/member/cart')
        this.list = res.data.result
      } else {
        type ResItem = {
          isEffective: boolean
          nowPrice: string
          stock: number
        }
        this.list.forEach(async item => {
          const res = await http.get<ApiObjRes<ResItem>>(`/goods/stock/${item.skuId}`)
          item.isEffective = res.data.result.isEffective
          item.nowPrice = res.data.result.nowPrice
          item.stock = res.data.result.stock
        })
      }
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
    // 登录后合并购物车
    async cartMerge () {
      const newArr = this.list.map(item => {
        return {
          skuId: item.skuId,
          selected: item.selected,
          count: item.count
         }
      })
      const res = await http.post<ApiRes<CartItem>>('/member/cart/merge', newArr)
      this.list = res.data.result
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