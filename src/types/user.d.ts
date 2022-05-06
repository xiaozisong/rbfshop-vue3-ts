// 用户信息类型
export interface IUserProfile {
  id: string;
  account: string;
  mobile: string;
  token: string;
  avatar: string;
  nickname: string;
  gender: string;
  birthday?: any;
  cityCode: string;
  provinceCode: string;
  profession: string;
}