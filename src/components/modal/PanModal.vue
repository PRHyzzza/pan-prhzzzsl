<script setup lang="ts">
type Location = 'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right'

interface PropsType {
  show: boolean
  width?: string
  isMask?: boolean
  location?: Location
}

const props = withDefaults(defineProps<PropsType>(), {
  show: false,
  width: '35%',
  isMask: true,
  location: 'center',
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
    <Transition name="modal">
      <div
        v-if="show" top-0 bottom-0 left-0 right-0 fixed hfull wfull transition-opacity duration-500 flex
        p="x30px y20px" bg="#000 opacity-50" :class="location" @click="handleMask"
      >
        <div
          :style="width" flex flex-col gap-10px bg="white dark:#242424" dark:text-gray-100 min-w-300px min-h-20
          rounded transition-all duration-500 shadow p="x30px y20px" @click.stop
        >
          <div font-medium flex flex-row justify-between items-center>
            <slot name="header">
              header
            </slot>
            <div i-carbon-close icon-btn text-2xl @click="$emit('handleClose')" />
          </div>
          <main>
            <slot name="content">
              content
            </slot>
          </main>
          <div flex flex-row justify-end items-center>
            <slot name="footer">
              footer
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  opacity: 1;
}

.top-left{
  --at-apply:
  justify-start
  items-start
}

.top{
  --at-apply:
  justify-center
  items-start
}

.top-right{
  --at-apply:
  justify-end
  items-start
}

.left{
  --at-apply:
  justify-start
  items-center
}

.center{
  --at-apply:
  justify-center
  items-center
}

.right{
  --at-apply:
  justify-end
  items-center
}

.bottom-left{
  --at-apply:
  justify-start
  items-end
}

.bottom{
  --at-apply:
  justify-center
  items-end
}

.bottom-right{
  --at-apply:
  justify-end
  items-end
}
</style>
