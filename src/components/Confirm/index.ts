import XtxConfirm from '@/components/Confirm/confirm.vue'
import { h, render } from 'vue'

type ConfirmType = {
  title: string
  text: string
}

export default function Confirm({title, text}: ConfirmType){
  const VDiv = document.createElement('div')
  VDiv.id = 'Confirm-container'
  document.body.appendChild(VDiv)
  return new Promise((resolve, reject) => {
    const confirmCallback = () => {
      render(null, VDiv)
      resolve('confirm')
    }
    const cancelCallback = () => {
      render(null, VDiv)
      reject('cancel')
    }
    const VNode = h(XtxConfirm, {title, text, cancelCallback, confirmCallback}) // 创建虚拟DOM
    render(VNode, VDiv)
  })
  
}