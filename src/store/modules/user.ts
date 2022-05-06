import { defineStore } from "pinia";
import http from '@/utils/request'
import { IUserProfile } from '@/types/user'
import { ApiObjRes } from "@/types/data"
export default defineStore('user', {
  state() {
    return {
      profile: {} as IUserProfile
    }
  },
  actions: {
    async getUserProfile (obj: {account: string, password: string}) {
      const res = await http.post<ApiObjRes<IUserProfile>>('/login', obj)
      this.profile = res.data.result
    }
  },
  getters: {

  }
})