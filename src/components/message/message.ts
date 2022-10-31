import { createVNode, render } from 'vue'
import Message from './PanMessage.vue'

let timer: any = null

const renderMessage = (vnode: any, duration = 3000) => {
  const messageNode = document.createElement('div')
  const attr = document.createAttribute('class')
  attr.value = 'message'
  messageNode.setAttributeNode(attr)
  const height = 54 // 单个消息框高度
  const messageList = document.getElementsByClassName('message')
  messageNode.style.top = `${messageList.length * height}px`
  document.body.appendChild(messageNode)
  render(vnode, messageNode)
  clearTimeout(timer)// 清理上一个定时器
  timer = setTimeout(() => {
    render(null, messageNode)
    Array.from(document.querySelectorAll('.message')).forEach((item) => {
      item.remove()
    })
  }, duration + 100)
}

export default {
  error: (text: string | number, duration?: number) => {
    const vnode = createVNode(Message, { type: 'error', text, duration })
    renderMessage(vnode, duration)
  },
  warn: (text: string, duration?: number) => {
    const vnode = createVNode(Message, { type: 'warn', text, duration })
    renderMessage(vnode, duration)
  },
  success: (text: string, duration?: number) => {
    const vnode = createVNode(Message, { type: 'success', text, duration })
    renderMessage(vnode, duration)
  },
  info: (text: string, duration?: number) => {
    const vnode = createVNode(Message, { type: 'info', text, duration })
    renderMessage(vnode, duration)
  },
}
