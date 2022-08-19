<script setup lang="ts">
const props = withDefaults(defineProps<{
  show: boolean
  width?: string
  isMask?: boolean
  direction?: 'left' | 'right'
  title?: string
}>(), {
  show: false,
  width: '30%',
  isMask: true,
  direction: 'left',
  title: '',
})

const emits = defineEmits(['handleClose', 'close'])

const width = computed(() => {
  return { width: props.width }
})

const handleMask = (): void => {
  if (props.isMask)
    emits('handleClose')
}

watch(() => props.show, (val: boolean) => {
  document.body.style.overflow = val ? 'hidden' : 'auto'
  if (!val)
    emits('close')
})
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="show" top-0 bottom-0 left-0 right-0 fixed hfull wfull transition-opacity duration-500 bg="#000 opacity-50" @click="handleMask">
        <div relative hfull wfull @click.stop>
          <div :class="`drawer-${direction}`" :style="width" bg="white dark:#242424" dark:text-gray-100 hfull shadow min-w-240px absolute p="x2rem y1.5rem">
            <div flex flex-row justify-between items-center>
              <h3>{{ title }}</h3>
              <div i-carbon-close icon-btn text-2xl @click="$emit('handleClose')" />
            </div>
            <main>
              <slot>
                content
              </slot>
            </main>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-left{
  left: 0;
  animation: drawer-left 0.5s;
}
.drawer-right{
  right: 0;
  animation: drawer-right 0.5s;
}
@keyframes drawer-left {
  0%{
    transform: translate(-100%, 0)
  }

  100% {
    transform: translate(0, 0)
  }
}
@keyframes drawer-right {
  0%{
    transform: translate(100%, 0)
  }

  100% {
    transform: translate(0, 0)
  }
}
.drawer-enter-from {
  opacity: 0;
}

.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .drawer-container,
.drawer-leave-to .drawer-container {
  opacity: 1;
}
</style>
