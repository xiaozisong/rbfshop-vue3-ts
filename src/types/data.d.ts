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
  children: CateList[]
  open: boolean,
  goods: IGoodsItem[]
}

// 声明category请求返回的数据类型
// export type CateResType = {
//     code: string
//     msg: string
//     result: CateList
// }

// 这里的RootObject接口类型与上面的CateResType类型相同，所以保留一个即可
// 因为我们接口返回的数据大部分都是 code msg result这种格式，但是result里面的数据类型我们不保证相同，所以这里使用泛型，把类型当做参数传递
export interface ApiRes<T> {
  code: string;
  msg: string;
  result: T[];
}
// 返回的是对象数据类型
export interface ApiObjRes<T> {
  code: string;
  msg: string;
  result: T;
}

export interface BannerResult {
  id: string;
  imgUrl: string;
  hrefUrl: string;
  type: string;
}

export interface GoodsItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  orderNum?: number;
}

export type HotGoods = {
  id: string
  picture: string
  title: string
  alt: string
}
export type Brand = {
  id: string
  name: string
  nameEn: string
  logo: string
  picture: string
  type?: any
  desc: string
  place: string
}
// 首页商品推荐
export type HomeProduct = {
  id: string
  name: string
  picture: string
  saleInfo: string
  children: {
    id: string
    name: string
  }[]
  goods: {
    id: string
    name: string
    desc: string
    price: string
    picture: string
    discount?: any
    orderNum: number
  }[]
}
// 顶级分类类型
export type TopCategory = {
  id: string
  name: string
  picture: string
  children: CategoryItem[]
}
interface CategoryItem {   
  brands: null // 有可能会修改   
  categories: null // 有可能会修改   
  goods: GoodsItem[]   
  id: string   
  name: string   
  parentId: null | string   
  parentName: null | string  
   picture: string   
   saleProperties: null // 有可能会修改 
}
export type SubCategory = {
  id: string
  name: string
  picture?: any
  parentId: string
  parentName: string
  brands: {
    id: string
    name: string
    nameEn: string
    logo: string
    picture: string
    type?: any
    desc: string
    place: string
  }[]
  saleProperties: SaleProperty[]
  goods: GoodItem[]
}

