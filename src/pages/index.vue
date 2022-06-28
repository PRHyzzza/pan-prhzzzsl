<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <span text-xl>{{ t('intro.home.title') }}</span>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
