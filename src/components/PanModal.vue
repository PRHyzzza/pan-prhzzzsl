<script setup lang="ts">
const props = withDefaults(defineProps<{
  show: boolean,
  width?: number | String,
  widthType?: 'px' | '%',
}>(), {
  show: false,
  width: 35,
  widthType: '%',
})

const widthClass = computed(() => {
  return `width:${props.width}${props.widthType}`
})

</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" top-0 bottom-0 left-0 right-0 fixed hfull wfull transition-opacity duration-300 flex
        justify-center items-center bg="#000 opacity-50">
        <div :style="widthClass" flex flex-col bg-white h-20 rounded shadow-bluegray shadow p="x20px y30px">

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
