<script setup lang="ts">
const props = defineProps<{
  itemKey: number
}>()
const activeIndex = ref(0)
const oldIndex = ref(0)
const { proxy } = getCurrentInstance() as any
proxy.$sub('pan.swiper.index', (index: number[]) => {
  oldIndex.value = activeIndex.value
  activeIndex.value = index[0]
})
const show = computed(() => {
  return activeIndex.value === props.itemKey - 1
    ? {
        transform: 'translateX(0)',
      }
    : oldIndex.value < activeIndex.value
      ? {
          transform: `translateX(-${100 - (activeIndex.value - props.itemKey + 1) * 300}px)`,
        }
      : {
          transform: `translateX(${100 - (props.itemKey - activeIndex.value - 1) * 300}px)`,
        }
})
onMounted(() => {

})
</script>

<template>
  <div class="swiper_item" :style="show">
    <slot />
  </div>
</template>

<style scoped>
.swiper_item {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
  transition: all 1s ease-in-out;
}
</style>
