<script setup lang="ts">
const swiper = ref()
const items = ref()
const activeIndex = ref(0)

onMounted(() => {
  updateItems()
  // setInterval(() => {
  //   activeIndex.value = (activeIndex.value + 1) % items.value.length
  // }, 1000)
})

function updateItems() {
  items.value = Array.from(swiper.value.children)
  items.value = items.value.filter((item: { tagName: string }) => item.tagName === 'DIV')
}

function handleIndicatorClick(index: number) {
  activeIndex.value = index
}

const throttledFn = useThrottleFn((index: number) => {
  handleIndicatorClick(index)
}, 300)
</script>

<template>
  <div ref="swiper" relative>
    <slot />
    <ul block absolute bottom-0 left-10 gap-8px>
      <li
        v-for="item, index in items" :key="item"
        :class="{
          active: activeIndex === index,
        }"
        inline-block w-30px h-6px bg-gray-300 opacity-50
        mx-4px rounded-4px transition-opacity duration-300
        @click.stop="handleIndicatorClick(index)"
        @mouseenter="throttledFn(index)"
      />
    </ul>
  </div>
</template>

<style scoped>
.active{
  opacity: 1;
}
</style>
