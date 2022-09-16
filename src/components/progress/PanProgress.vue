<script setup lang="ts">
interface Props {
  modelValue: number
  max?: number
  color?: string
  text?: string
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  max: 100,
  width: 200,
  height: 32,
  color: 'rgb(147, 197, 253)',
})

const style = computed(() => {
  return {
    '--width': props.modelValue / props.max < 1 ? `${props.modelValue / props.max * 100}%` : '100%',
    '--bg-color': props.color,
    'width': `${props.width}px`,
    'height': `${props.height}px`,
  }
})
</script>

<template>
  <div class="progress" relative flex row rounded shadow transition-transform p="y1 x2" :style="style">
    <div v-if="text" v-text="text" />
    <slot />
  </div>
</template>

<style scoped>
  .progress::before{
    width: var(--width);
    background: var(--bg-color);
    z-index: -1;
    content:"";
    --at-apply:
    rounded
    absolute
    h-full
    top-0
    left-0
  }
</style>
