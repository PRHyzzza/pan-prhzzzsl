<script setup lang="ts">
const props = withDefaults(defineProps<{
  show: boolean
  width?: string
  isMask?: boolean
}>(), {
  show: false,
  width: '30%',
  isMask: true,
})

const drawer = computed(() => {
  return { width: props.width }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div top-0 bottom-0 left-0 right-0 fixed hfull wfull transition-opacity duration-500 bg="#000 opacity-50">
        <div :style="drawer" bg="white dark:#242424" dark:text-gray-100 hfull left-0 shadow min-240px />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@keyframes ltr-drawer-in {
  0%{
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0)
  }

  100% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0)
  }
}
</style>
