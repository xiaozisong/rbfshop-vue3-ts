export type AreaList = {
  code: string
  level: number
  name: string
  areaList: AreaList[]
}
export type Address = {
  provinceCode: string;
  provinceName: string;
  cityCode: string;
  cityName: string;
  countyCode: string;
  countyName: string;
}