<script setup lang="ts">
const props = withDefaults(defineProps<{
  codeNum?: number
}>(), {
  codeNum: 6,
})

const emits = defineEmits(['update:modelValue'])

const code = ref<String[]>([])
const panCode = ref()
const modelValue = ref()

code.value.push(...Array(props.codeNum).fill(''))

const enterInput = (index: any) => {
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
  if (index === 1)
    return
  panCode.value.children[index - 2].focus()
}
</script>

<template>
  <div ref="panCode" flex flex-row justify-center items-center gap-2>
    <input
      v-for="item in codeNum" :key="item" v-model="code[item - 1]" type="text" maxlength="1" text-center input
      p-4px w-8 h-8 @input="enterInput(item)" @keyup.delete="deleteInput(item)"
    >
  </div>
</template>
