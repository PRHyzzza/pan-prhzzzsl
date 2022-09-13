<script setup lang="ts">
const props = withDefaults(defineProps<{
  placeholder?: string
  modelValue?: number | string
  type?: 'text' | 'password'
  form?: boolean
}>(), {
  placeholder: '',
  type: 'text',
  form: false,
})
const emits = defineEmits(['update:modelValue'])
const formItem: any = ref()
const { proxy } = getCurrentInstance() as any
function input(event: Event) {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
  if (props.form)
    proxy.$pub(`pan.form.item.validate${formItem.value.prop}`)
}

onMounted(() => {
  if (props.form)
    formItem.value = inject('formItem')
})
</script>

<template>
  <input
    ref="inputRef" autocomplete="false" p="x4 y2" input :placeholder="placeholder" :value="modelValue" :type="type"
    @input="input($event)" @blur="input($event)"
  >
</template>
