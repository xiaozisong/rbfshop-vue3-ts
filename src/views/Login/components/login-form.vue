<template>
  <div class="account-box">
    <div class="toggle">
      <a href="javascript:;" v-if="activeName === 'mobile'"  @click="activeName = 'account'">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a href="javascript:;" v-else @click="activeName = 'mobile'">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <div class="form">
      <template v-if="activeName === 'account'">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input type="text" v-model="account" placeholder="请输入用户名或手机号" />
          </div>
          <div class="error" v-if="accountErrorMsg"><i class="iconfont icon-warning" />{{ accountErrorMsg }}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input type="password" v-model="password"  placeholder="请输入密码" />
          </div>
          <div class="error" v-if="pwdErrorMsg"><i class="iconfont icon-warning" />{{ pwdErrorMsg }}</div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input type="text" placeholder="请输入手机号" v-model="mobile" ref="mobileTarget" />
          </div>
          <div class="error" v-if="mobileErrorMsg"><i class="iconfont icon-warning" />{{ mobileErrorMsg }}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input type="text" placeholder="请输入验证码" v-model="code" />
            <span class="code" @click="sendCode">{{ count > 0 ? `${count}s后重新发送` : '发送验证码'}}</span>
          </div>
          <div class="error" v-if="codeErrorMsg"><i class="iconfont icon-warning" />{{ codeErrorMsg }}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
         <XtxCheckbox @handle-check="handleCheck" v-model="isAgree"></XtxCheckbox>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="isAgreeErrorMsg"><i class="iconfont icon-warning" />{{ isAgreeErrorMsg }}</div>
      </div>
      <a href="javascript:;" class="btn" @click="handleLogin">登录</a>
    </div>
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&amp;response_type=token&amp;scope=all&amp;redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
        ><img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt="QQ登录"
          border="0"
      /></a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="LoginForm">
import {  ref, watch } from 'vue'
import useStore from '@/store'
import Message from '@/components/message'
import { useRouter } from 'vue-router'
// 引入表单校验库
import { useForm,useField } from 'vee-validate'
// 使用vueuse/core中的hook
import { useCountDown } from '@/utils/hooks'
// 仓库
const { user } = useStore()
// 路由实例
const router = useRouter()
const activeName = ref<'account' | 'mobile'>('account')
// 定义勾选协议的val
const isCheck = ref(false) 
// 子传父
const handleCheck = (val: boolean) => {
  isAgree.value = val
}
// ---------------------------------------表单--------------------------------------
const { validate, resetForm } = useForm({
  validationSchema: { // 定义规则
    // 用户名规则
    account(value: string){
      if (!value) return '用户名不能为空'
      // 判断用户名的合法性
      if(!/^[a-zA-Z]\w{4,19}$/.test(value)) return '必须以数字开头，并且长度最少为5位！'
      return true
    },
    // 密码规则
    password(value: string){
      if(!value) return '密码不能为空'
      if(!/^\w{6,12}$/.test(value)) return '请输入6-12位非空字符'
      return true
    },
    // 同意协议规则
    isAgree(value: boolean) {
      if(!value) return '请勾选协议'
      return true
    },
    // 手机号 
    mobile(value: string) {
      if(!value) return '请输入手机号'
      if(!/^1[3-9]\d{9}$/.test(value)) return '请输入正确的手机号'
      return true
    },
    // 验证码
    code(value: string) {
      if(!value) return '请输入验证码'
      if(!/^\w{6}$/.test(value)) return '请输入六位验证码'
      return true
    }
  }
})
// 使用
const { value: account, errorMessage: accountErrorMsg } = useField<string>('account')
const { value: password, errorMessage: pwdErrorMsg } = useField<string>('password')
const { value: isAgree, errorMessage: isAgreeErrorMsg } = useField<boolean>('isAgree')
const { value: mobile, errorMessage: mobileErrorMsg, validate: mobileValid } = useField<string>('mobile')
const { value: code, errorMessage: codeErrorMsg } = useField<string>('code')
// 切换时，重置表单校验
watch(activeName, () => {
  resetForm()
})
// ----------------------------------------登录-------------------------------------
// 登录表单
// const accountForm = reactive({
//   account: '',
//   password: ''
// })
// ---------------------倒计时--------------------
const { count, start } = useCountDown(5)
// 发送验证码登录
const mobileTarget = ref<null | HTMLInputElement>(null)
const sendCode = async () => {
  const {valid} = await mobileValid()
  if(!valid) {
    mobileTarget.value!.focus()
    return
  }
  await user.getCode(mobile.value)
  Message({type: 'success', text: '已发送验证码'})
  start()
  console.log('可以发送验证码了');
}
// 登录
const handleLogin = async () => {
  const res = await validate()
  if (activeName.value === 'account') {
    if(res.errors.account || res.errors.password || res.errors.isAgree) return
    await user.getUserProfile({account: account.value, password: password.value })
  } else {
    if(res.errors.mobile || res.errors.code || res.errors.isAgree) return
    await user.codeLogin(mobile.value, code.value)
  }
  Message({type: 'success', text: '登录成功！'})
router.push('/')
}
</script>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
    }
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
