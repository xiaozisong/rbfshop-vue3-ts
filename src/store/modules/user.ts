import { defineStore } from "pinia";
import http from '@/utils/request'
import { IUserProfile } from '@/types/user'
import { ApiObjRes } from "@/types/data"
import { getProfile, removeProfile, setProfile } from "@/utils/storage";
export default defineStore('user', {
  state() {
    return {
      profile: getProfile() as IUserProfile
    }
  },
  actions: {
    async getUserProfile (obj: {account: string, password: string}) {
      const res = await http.post<ApiObjRes<IUserProfile>>('/login', obj)
      this.profile = res.data.result
      setProfile(res.data.result)
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
      this.profile = {} as IUserProfile
      removeProfile()
    }
  },
  getters: {

  }
})