<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <div py-20 />
    <span>{{t('intro.home.title')}}</span>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
