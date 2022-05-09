<script name="CallbackBind" lang="ts" setup>
import { ref } from 'vue'
import { accountRule, passwordRule, isAgreeRule, mobileRule, codeRule } from '@/utils/validate'
import { useForm,useField } from 'vee-validate'
import { useCountDown } from '@/utils/hooks'
import useStore from '@/store'
import Message from '@/components/message'
import router from '@/router'
const { user } = useStore()
const avatar = ref('')
const nickname = ref('')
const props = defineProps<{
  unionId: string
}>()
if(QC.Login.check()){
  QC.api('get_user_info').success((res: any) => {
    avatar.value = res.data.figureurl
    nickname.value = res.data.nickname
  })
}
// 表单规则
const { validate } = useForm({
  validationSchema: {
    mobile: mobileRule,
    code: codeRule
  }
})
const { value: mobile, errorMessage: mobileErrorMsg,validate: mobileValid } = useField<string>('mobile')
const { value: code, errorMessage: codeErrorMsg } = useField<string>('code')
// 发送验证进行手机号的表单校验
const mobileRef = ref<null | HTMLInputElement>(null)
const { start, count } = useCountDown(60)
const sendCode = async () => {
  const res = await mobileValid()
  if(!res.valid){
    mobileRef.value?.focus()
    return
  }
  if(count.value > 0) return
  start()
  await user.qqCode(mobile.value)
  Message({type: 'success', text: '验证码发送成功'})
}
// 绑定账号
const bind = async () => {
  const res = await validate() // 整体表单预校验
  if(!res.valid) return
  await user.qqBind(props.unionId, mobile.value, code.value)
  Message({type: 'success', text: '三方绑定成功'})
  router.push('/')
}
</script>
<template>
  <div class="xtx-form">
    <div class="user-info">
      <img
        :src="avatar"
        alt=""
      />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input class="input" ref="mobileRef" type="text" placeholder="绑定的手机号" v-model="mobile" />
      </div>
      <div class="error" v-if="mobileErrorMsg"><i class="iconfont icon-warning" />{{ mobileErrorMsg }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input class="input" type="text" placeholder="短信验证码" v-model="code" />
        <span class="code" @click="sendCode">{{ count > 0 ? `${count}s后发送` : '发送验证码'}}</span>
      </div>
      <div class="error" v-if="codeErrorMsg"><i class="iconfont icon-warning" />{{ codeErrorMsg }}</div>
    </div>
    <a href="javascript:;" class="submit" @click="bind">立即绑定</a>
  </div>
</template>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
