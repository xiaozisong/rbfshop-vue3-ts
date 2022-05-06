import { h, render } from "vue";
import XtxMessage from './message.vue'
// 定义类型
type MessageType = {
  type: 'success' | 'error' | 'warning',
  text: string,
  duration?: number
}
// 封装message弹窗
export default function Message({type, text, duration = 1000}: MessageType) {
  const VNode = h(XtxMessage, {type, text}) // 创建虚拟dom
  // 将虚拟dom挂载到容器中
  const VDivDom = document.createElement('div')
  VDivDom.id = 'Xtx-Message-container' // 为虚拟容器设置id
  document.body.appendChild(VDivDom) // 将虚拟容器挂载到HTML中
    // 将Message挂载到虚拟容器中
    render(VNode, VDivDom)
    setTimeout(() => {
      render(null, VDivDom)
    }, duration)
}