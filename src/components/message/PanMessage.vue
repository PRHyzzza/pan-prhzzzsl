<script setup lang='ts'>
interface PropsType {
  text?: string
  duration?: number
  type?: 'success' | 'error' | 'warn'
}
const props = withDefaults(defineProps<PropsType>(), {
  text: '这是一个message',
  duration: 3000,
})

const color = computed(() => {
  switch (props.type) {
    case 'success':
      return 'rgba(74, 222, 128, 1)'
    case 'error':
      return 'rgba(248, 113, 113, 1)'
    case 'warn':
      return 'rgba(251, 146, 60, 1)'
    default:
      return 'rgba(55, 65, 81, 1)'
  }
})

const show = ref(false)

const onClose = () => {
  show.value = false
}

const onOpen = () => {
  setTimeout(() => {
    show.value = true
  }, 10)

  // 指定时间后移除消息
  if (props.duration !== 0) {
    setTimeout(() => {
      onClose()
    }, props.duration)
  }
}

onOpen()
</script>

<template>
  <transition name="message">
    <div v-show="show" mb-14px>
      <div class="message-content">
        <div v-if="props.type" inline-block>
          <i v-if="props.type === 'success'" class="message-icon" i-ant-design:check-outlined />
          <i v-else-if="props.type === 'error'" class="message-icon" i-ant-design:close-outlined />
          <i v-else-if="props.type === 'warn'" class="message-icon" i-ant-design:exclamation-outlined />
        </div>
        <span v-text="props.text" />
      </div>
    </div>
  </transition>
</template>

<style>
.message-enter-active {
  transition: all .2s ease-out;
}

.message-leave-active {
  transition: all .2s ease;
}

.message-enter-from,
.message-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  z-index: 9999;
  transform: translateZ(9999px);
  padding-top: 28px;
  transition: top .4s ease;
}

.message-content {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 18px;
  height: 34px;
  font-size: 14px;
  font-weight: 400;
  border-radius: 4px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, .15);
  background: v-bind(color)
}

.message-icon {
  --at-apply:
    inline-block box-border vertical-middle mt--3px mr-6px font-400 text-18px
}
</style>
