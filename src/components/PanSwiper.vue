<script setup lang="ts">
const props = withDefaults(defineProps<{
  auto?: boolean
  duration?: number
  direction?: 'horizontal' | 'vertical' | string
  width?: number
  height?: number
  initialIndex?: number
}>(), {
  auto: true,
  duration: 2500,
  direction: 'horizontal',
  width: 300,
  height: 150,
  initialIndex: 0,
})
const swiper = ref()
const items = ref()
const activeIndex = ref(props.initialIndex)
const { proxy } = getCurrentInstance() as any
const timer = ref()

const child = ref({
  width: props.width,
  height: props.height,
  direction: props.direction,
})

watch(props, () => {
  child.value = {
    width: props.width,
    height: props.height,
    direction: props.direction,
  }
})

provide('swiper', child)

onMounted(() => {
  updateItems()
  startTimer()
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

function startTimer() {
  stopTimer()
  if (props.auto) {
    timer.value = setInterval(() => {
      activeIndex.value = (activeIndex.value + 1) % items.value.length
      proxyPub()
    }, props.duration)
  }
}

function stopTimer() {
  if (timer.value)
    clearInterval(timer.value)
}

onBeforeUnmount(() => {
  stopTimer()
  proxy.$unsub('pan.swiper.index')
})
</script>

<template>
  <div
    :style="`width:${width}px`" relative overflow-hidden
    @mouseenter="stopTimer" @mouseleave="startTimer"
  >
    <div ref="swiper" :style="`height:${height}px`" overflow-hidden>
      <slot />
    </div>

    <ul flex absolute bottom-2 left="50%" transform="translate-x--50%" gap-8px>
      <li
        v-for="item, index in items" :key="item"
        :class="{ active: activeIndex === index }"
        w-30px h-6px bg-gray-300 opacity-50
        rounded-4px transition-opacity duration-300
        @click.stop="handleIndicatorClick(index)"
        @mouseenter="throttledFn(index)"
      />
    </ul>
  </div>
</template>

<style scoped>
.active {
  opacity: 1;
}
</style>
