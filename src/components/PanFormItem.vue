<script setup lang="ts">
defineProps({
  lable: String,
  prop: String,
})
</script>

<template>
  <div flex flex-row items-center mb-6>
    <span v-if="lable" w-80px text-start>{{ lable }}</span>
    <slot></slot>
  </div>
</template>

