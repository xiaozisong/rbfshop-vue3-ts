import http from '@/utils/request'
import { CateList, CateResType } from "@/types/data";
export const reqGetCateList = () => {
  return http({
    method: 'get',
    url: '/home/category/head'
  })
}