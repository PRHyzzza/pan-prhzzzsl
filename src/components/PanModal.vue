<script setup lang="ts">
const props = withDefaults(defineProps<{
  show: boolean
  width?: string
  isMask?: boolean
}>(), {
  show: false,
  width: '35%',
  isMask: true,
})

const emits = defineEmits(['handleClose', 'close'])

const widthClass = computed(() => {
  return { width: props.width }
})

const handleMask = (): void => {
  if (props.isMask)
    emits('handleClose')
}

watch(() => props.show, (val: boolean) => {
  val
    ? document.body.style.overflow = 'hidden'
    : document.body.style.overflow = 'auto'
  if (!val)
    emits('close')
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show" top-0 bottom-0 left-0 right-0 fixed hfull wfull transition-opacity duration-500 flex
        justify-center items-center bg="#000 opacity-50" @click="handleMask"
      >
        <div
          :style="widthClass" flex flex-col gap-10px bg="white dark:#242424" dark:text-gray-100 min-w-300px min-h-20
          rounded transition-all duration-500 shadow p="x30px y20px"
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
</style>
