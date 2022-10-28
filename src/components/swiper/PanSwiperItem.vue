<script setup lang="ts">
import type { Ref } from 'vue'

const props = defineProps<{
  itemKey: number
}>()
const activeIndex = ref(0)
const { proxy } = getCurrentInstance() as any
const swiper = inject('swiper') as Ref<{ width: number; height: number; direction: 'horizontal' | 'vertical' }>

proxy.$sub('pan.swiper.index', (index: { index: number }[]) => {
  activeIndex.value = index[0].index + 1
})

const show = computed(() => {
  return {
    transform: `translate${swiper.value.direction === 'horizontal' ? 'X' : 'Y'}
    (${(props.itemKey === activeIndex.value ? 0 : props.itemKey < activeIndex.value ? -1 : 1) * swiper.value.width}px)`,
    transition: 'transform .4s',
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
