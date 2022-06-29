<script setup lang="ts">
const { t } = useI18n()
const value=ref(0)
</script>

<template>
  <div>
    <span text-xl>{{ t('intro.home.title') }}</span>
    <PanInput v-model="value"/>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
