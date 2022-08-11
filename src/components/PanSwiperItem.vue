<script setup lang="ts">
import type { Ref } from 'vue'

const props = defineProps<{
  itemKey: number
}>()
const activeIndex = ref(0)
const size = ref()
const { proxy } = getCurrentInstance() as any
const swiper = inject('swiper') as Ref<{ width: number; height: number; direction: 'horizontal' | 'vertical' }>

proxy.$sub('pan.swiper.index', (index: { index: number; size: number }[]) => {
  activeIndex.value = index[0].index
  size.value = index[0].size
})

const show = computed(() => {
  if (swiper.value.direction === 'horizontal') {
    return {
      transform: `translateX(${Math.abs((props.itemKey - 1) - activeIndex.value) * swiper.value.width}px)`,
      transition: Math.abs((props.itemKey - 1) - activeIndex.value) === 0 ? 'transform .4s' : 'none',
    }
  }
  return {
    transform: `translateY(${Math.abs((props.itemKey - 1) - activeIndex.value) * swiper.value.height}px)`,
    transition: Math.abs((props.itemKey - 1) - activeIndex.value) === 0 ? 'transform .4s' : 'none',
  }
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
