<script setup lang="ts">
withDefaults(defineProps<{
  placeholder?: string,
  modelValue?: number | string,
  type?: 'text' | 'password',
}>(), {
  placeholder: '',
  type: 'text',
})
const emits = defineEmits(['update:modelValue'])

function input(event: Event) {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
}

function checkValue(){
  
}

</script>

<template>
  <div flex flex-row gap-10px items-center>
    <input autocomplete="false" p="x4 y2" input :placeholder="placeholder" :value="modelValue" @input="input($event)"
      :type="type" @blur="checkValue"/>
  </div>

</template>
