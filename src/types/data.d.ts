// 声明category数组的类型
export type CateList = {
  id: string,
  name: string,
  picture: string,
  children: CateList
}[]
// 声明category请求返回的数据类型
export type CateResType = {
    code: string,
    msg: string,
    result: CateList
}