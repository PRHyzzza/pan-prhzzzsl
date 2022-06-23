<script setup lang="ts">
useHead({
  title: 'pan',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ]
})
</script>

<template>
  <RouterView />
</template>
