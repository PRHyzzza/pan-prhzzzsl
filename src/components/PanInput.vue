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
    <input autocomplete="false" p="x4 y2" bg="transparent" focus:shadow
      border="~ rounded gray-200 dark:gray-700 focus:teal-600 focus:dark:teal-600" outline="none active:none"
      :placeholder="placeholder" :value="modelValue" @input="input($event)" :type="type" />
  </div>

</template>
