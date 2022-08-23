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
  return {
    'width': props.width,
    '--drawer': props.direction === 'left' ? '-100%' : '100%',
  }
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
      <div v-if="show" top-0 bottom-0 left-0 right-0 fixed hfull wfull>
        <div
          class="drawer" :class="`drawer-${direction}`" :style="width" bg="white dark:#242424" dark:text-gray-100
          hfull shadow min-w-240px absolute p="x8 y4"
        >
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
        <div h-full transition-opacity duration-500 bg="#000 opacity-50" @click.stop="handleMask" />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-left {
  left: 0;
}

.drawer-right {
  right: 0;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-active .drawer,
.drawer-leave-active .drawer {
  transition: transform 0.5s ease-in-out;
}

.drawer-enter-from .drawer,
.drawer-leave-to .drawer {
  transform: translate(var(--drawer), 0);
}
</style>
