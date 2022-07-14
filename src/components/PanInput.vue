<script setup lang="ts">
import emitter from '~/utils/emitter'
withDefaults(defineProps<{
  placeholder?: string
  modelValue?: number | string
  type?: 'text' | 'password'
}>(), {
  placeholder: '',
  type: 'text',
})
const emits = defineEmits(['update:modelValue'])
const inputRef = ref()
const parent = ref()
function input(event: Event) {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
  emitter.emit('validate', parent.value)
}

onMounted(() => {
  if (inputRef.value.parentElement.className === 'form-item')
    parent.value = inject('form-item')
})
</script>

<template>
  <input
    ref="inputRef" autocomplete="false" p="x4 y2" input :placeholder="placeholder" :value="modelValue"
    :type="type" @input="input($event)" @blur="input($event)"
  >
</template>
