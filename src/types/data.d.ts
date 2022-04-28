// 声明category数组中的goods类型
interface IGoodsItem {
  desc: string
  discount:null
  id: string
  name: string
  orderNum:null
  picture: string
  price: string
}

// 声明category数组的类型
export type CateList = {
  id: string
  name: string
  picture: string
  children: CateList
  open: boolean,
  goods: IGoodsItem[]
}[]
// 声明category请求返回的数据类型
export type CateResType = {
    code: string
    msg: string
    result: CateList
}
