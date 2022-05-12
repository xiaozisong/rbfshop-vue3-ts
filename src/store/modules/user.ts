import { defineStore } from "pinia";
import http from '@/utils/request'
import { IUserProfile } from '@/types/user'
import { ApiObjRes } from "@/types/data"
import { getProfile, removeProfile, setProfile } from "@/utils/storage";
import useStore from '@/store'
export default defineStore('user', {
  state() {
    return {
      profile: getProfile() as IUserProfile
    }
  },
  actions: {
    // 登录并获取用户资料
    async getUserProfile (obj: {account: string, password: string}) {
      const res = await http.post<ApiObjRes<IUserProfile>>('/login', obj)
      this.profile = res.data.result
      setProfile(res.data.result)
      const { cart } = useStore()
      cart.cartMerge()
    },
    // 发送验证码
    async getCode (mobile: string) {
      await http.get('/login/code', {
        params: {
          mobile
        }
      })
    },
    // 验证码登录
    async codeLogin (mobile: string, code: string) {
      const res = await http.post<ApiObjRes<IUserProfile>>('/login/code', { mobile, code } )
      this.profile = res.data.result
      setProfile(res.data.result)
    },
    // 退出
    logout () {
      const { cart } = useStore()
      this.profile = {} as IUserProfile
      removeProfile()
      cart.clearCart()
    },
    // 第三方登录第一种情况，已有账号，已绑定
    async qqLogin (unionId: string , source: number = 6) {
      const res = await http.post<ApiObjRes<IUserProfile>>('/login/social', { unionId, source })
      this.profile = res.data.result
      setProfile(res.data.result)
    },
    // ----------------------    第三方登录第二种情况 -----------------------------
    // 第三方登录发送验证码
    async qqCode (mobile: string) {
      await http.get('/login/social/code', {params: {mobile}})
    },
    // qq账号与手机号进行绑定
    async qqBind (unionId: string, mobile: string, code: string) {
      const res = await http.post<ApiObjRes<IUserProfile>>('/login/social/bind', {unionId, mobile, code})
      this.profile = res.data.result
      setProfile(res.data.result)
    },
    async qqPatchLogin(data: any) {
      const res = await http.post<ApiObjRes<IUserProfile>>(
        `/login/social/${data.openId}/complement`,
        data
      )
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result
      setProfile(res.data.result)
    },
    // 绑定qq的短信验证码
    async sendQQPathMsg(mobile: string) {
      await http.get('/register/code', {
        params: {
          mobile
        }
      })
    },
  },
  getters: {

  }
})