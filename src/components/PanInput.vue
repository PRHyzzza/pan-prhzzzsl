<script setup lang="ts">
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
const formItem: any = ref()
const { proxy } = getCurrentInstance() as any
function input(event: Event) {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
  proxy.$pub(`pan.form.item.validate${formItem.value.prop}`)
}

onMounted(() => {
  if ((inputRef.value.parentElement.className) === 'form-item')
    formItem.value = inject('formItem')
})
</script>

<template>
  <input
    ref="inputRef" autocomplete="false" p="x4 y2" input :placeholder="placeholder" :value="modelValue" :type="type"
    @input="input($event)" @blur="input($event)"
  >
</template>
