<script setup lang="ts">
const props = defineProps<{
  itemKey: number
}>()
const activeIndex = ref(0)
const size = ref()
const { proxy } = getCurrentInstance() as any
proxy.$sub('pan.swiper.index', (index: { index: number; size: number }[]) => {
  activeIndex.value = index[0].index
  size.value = index[0].size
})

const show = computed(() => {
//   0 1 2 -1
//   -1 0 1 2
//   2 -1 0 1
//   1 2 -1 0
  return {
    transform: `translateX(${Math.abs((props.itemKey - 1) - activeIndex.value) * 300}px)`,
    transition: Math.abs((props.itemKey - 1) - activeIndex.value) === 0 ? 'transform .4s' : 'none',
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

}
</style>
