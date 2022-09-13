<script setup lang="ts">
const props = withDefaults(defineProps<{
  codeNum?: number
  form?: boolean
}>(), {
  codeNum: 6,
  form: false,
})

const emits = defineEmits(['update:modelValue'])

const code = ref<String[]>([])
const panCode = ref()
const modelValue = ref()
const formItem: any = ref()
const { proxy } = getCurrentInstance() as any

code.value.push(...Array(props.codeNum).fill(''))

const enterInput = (index: any) => {
  if (props.form)
    proxy.$pub(`pan.form.item.validate${formItem.value.prop}`)
  const oldValue = modelValue.value
  modelValue.value = code.value.join('')
  emits('update:modelValue', modelValue.value)
  if (oldValue > modelValue.value)
    return
  if (index > props.codeNum - 1)
    return
  panCode.value.children[index].focus()
}

const deleteInput = (index: any) => {
  if (props.form)
    proxy.$pub(`pan.form.item.validate${formItem.value.prop}`)
  if (index === 1)
    return
  panCode.value.children[index - 2].focus()
}

const blurInput = (index: any) => {
  if (props.form)
    proxy.$pub(`pan.form.item.validate${formItem.value.prop}`)
}

onMounted(() => {
  if (props.form)
    formItem.value = inject('formItem')
})
</script>

<template>
  <div ref="panCode" flex flex-row justify-center items-center gap-2>
    <input
      v-for="item in codeNum" :key="item" v-model="code[item - 1]" type="text" maxlength="1" text-center input
      p-4px w-8 h-8 @input="enterInput(item)" @keyup.delete="deleteInput(item)" @blur="blurInput"
    >
  </div>
</template>
