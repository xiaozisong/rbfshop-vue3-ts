 // 用户名规则
 export function accountRule(value: string){
  if (!value) return '用户名不能为空'
  // 判断用户名的合法性
  if(!/^[a-zA-Z]\w{4,19}$/.test(value)) return '必须以数字开头，并且长度最少为5位！'
  return true
}
// 密码规则
export function passwordRule(value: string){
  if(!value) return '密码不能为空'
  if(!/^\w{6,12}$/.test(value)) return '请输入6-12位非空字符'
  return true
}
// 同意协议规则
export function isAgreeRule(value: boolean) {
  if(!value) return '请勾选协议'
  return true
}
// 手机号 
export function mobileRule(value: string) {
  if(!value) return '请输入手机号'
  if(!/^1[3-9]\d{9}$/.test(value)) return '请输入正确的手机号'
  return true
}
// 验证码
export function codeRule(value: string) {
  if(!value) return '请输入验证码'
  if(!/^\w{6}$/.test(value)) return '请输入六位验证码'
  return true
}
export function rePasswordRule(value: string, { form }: any) {
  if (!value) return '请输入确认密码'
  if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
  // 校验密码是否一致  form表单数据对象
  if (value !== form.password) return '两次输入的密码不一致'
  return true
}