<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <span text-xl>{{ t('intro.home.title') }}</span>
    <RouterLink to="/login">
      login
    </RouterLink>
    <PanSwiper>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </PanSwiper>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
