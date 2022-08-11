<script setup lang="ts">
const swiper = ref()
const items = ref()
const activeIndex = ref(0)
const { proxy } = getCurrentInstance() as any
const timer = ref()

onMounted(() => {
  updateItems()
  timer.value = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % items.value.length
    proxyPub()
  }, 3000)
})

function updateItems() {
  items.value = Array.from(swiper.value.children)
  items.value = items.value.filter((item: { className: string }) => item.className === 'swiper_item')
  if (items.value.length === 0)
    throw new Error('PanSwiper must have PanSwiperItem as children')
}

function handleIndicatorClick(index: number) {
  activeIndex.value = index
  proxyPub()
}

function proxyPub() {
  proxy.$pub('pan.swiper.index', {
    index: activeIndex.value,
    size: items.value.length,
  })
}

const throttledFn = useThrottleFn((index: number) => {
  handleIndicatorClick(index)
}, 300)

onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<template>
  <div relative w-300px overflow-hidden>
    <div ref="swiper" h-100px overflow-hidden>
      <slot />
    </div>

    <ul block absolute bottom-0 left-10 gap-8px>
      <li
        v-for="item, index in items" :key="item" :class="{
          active: activeIndex === index,
        }" inline-block w-30px h-6px bg-gray-300 opacity-50 mx-4px rounded-4px transition-opacity duration-300
        @click.stop="handleIndicatorClick(index)" @mouseenter="throttledFn(index)"
      />
    </ul>
  </div>
</template>

<style scoped>
.active {
  opacity: 1;
}
</style>
