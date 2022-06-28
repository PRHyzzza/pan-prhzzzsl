<script setup lang="ts">
const { height, width } = useWindowSize()

const box = reactive({
  width: width.value + 'px',
  height: height.value + 'px',
})
watch(height, () => {
  box.height = height.value + 'px'
})
watch(width, () => {
  box.width = width.value + 'px'
})
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200" :style="box">
    <RouterView />
    <Footer />
    <Record />
  </main>
</template>
