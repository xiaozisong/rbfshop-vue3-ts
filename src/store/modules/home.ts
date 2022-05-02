import { defineStore } from "pinia"
import request from '@/utils/request'
import { ApiRes, BannerResult, GoodsItem, HotGoods, Brand, HomeProduct } from '@/types/data'
export default defineStore('home', {
  state(){
    return {
      bannerList: [] as BannerResult[],
      newGoodsList: [] as GoodsItem[],
      hotGoodsList: [] as HotGoods[],
      productList: [] as HomeProduct[],
      // 品牌数据
      brandList: [] as Brand[],
    }
  },
  actions: {
    async getBannerList(){
      const res = await request.get<ApiRes<BannerResult>>('/home/banner')
      console.log(res.data.result)
      this.bannerList = res.data.result
    },
    // 获取新鲜好物数据
    async getNewGoodList () {
      const res = await request.get<ApiRes<GoodsItem>>('/home/new')
      this.newGoodsList = res.data.result
    },
    // 获取热门推荐数据
    async getHotList () {
      const res = await request.get<ApiRes<HotGoods>>('/home/hot')
      this.hotGoodsList = res.data.result
    },
    async getBrandList() {
      const res = await request.get<ApiRes<Brand>>('/home/brand')
      this.brandList = res.data.result
    },
    async getProductList() {
      const res = await request.get<ApiRes<HomeProduct>>('/home/goods')
      this.productList = res.data.result
    },
  },
  getters: {

  }
})