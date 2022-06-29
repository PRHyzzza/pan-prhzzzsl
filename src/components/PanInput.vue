<script setup lang="ts">
withDefaults(defineProps<{
  placeholder?: string,
  modelValue?: number | string,
}>(), {
  placeholder: ''
})
const emits = defineEmits(['update:modelValue'])

function input(event: Event) {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <input type="text" autocomplete="false" p="x4 y2" bg="transparent" focus:shadow
    border="~ rounded gray-200 dark:gray-700 focus:teal-600 focus:dark:teal-600" outline="none active:none"
    :placeholder="placeholder" :value="modelValue" @input="input($event)" />
</template>
