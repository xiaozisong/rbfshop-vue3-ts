/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

type FnType = (openId: string, accessToken: string) => void
// 声明QC的类型声明注解
declare namespace QC {
  const Login: {
    signOut:() => void
    check: () => boolean
    getMe: (cb: FnType) => void
  }
  const api: (api: 'get_user_info') => {success: (res: any) => void
}}
