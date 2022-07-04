<script setup lang="ts">
withDefaults(defineProps<{
  placeholder?: string,
  modelValue?: number | string,
  label?: string,
  type?: string,
}>(), {
  placeholder: '',
  type: 'text',
})
const emits = defineEmits(['update:modelValue'])

function input(event: Event) {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div flex flex-row gap-10px items-center w-330px>
    <span v-if="label" w-60px text-start>{{ label }}</span>
    <input autocomplete="false" p="x4 y2" input :placeholder="placeholder" :value="modelValue" @input="input($event)" :type="type" />
  </div>

</template>
