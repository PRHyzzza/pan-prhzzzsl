<script setup lang="ts">
const code = ref<String[]>([]);
const panCode = ref();
const modelValue = ref();
code.value.push(...Array(6).fill(''));

const emits = defineEmits(['update:modelValue'])

const enterInput = (index: any) => {
  let oldValue = modelValue.value;
  modelValue.value = code.value.join('');
  emits('update:modelValue', modelValue.value)
  if (oldValue > modelValue.value) return;
  if (index > code.value.length - 1) return;
  panCode.value.children[index].focus();
}

const deleteInput = (index: any) => {
  if (index === 1) return;
  panCode.value.children[index - 2].focus();
}
</script>

<template>
  <div flex flex-row justify-center items-center gap-2 ref="panCode">
    <!-- v-for渲染6个input -->
    <input v-for="item in 6" :key="item" type="text" v-model="code[item - 1]" maxlength="1" @input="enterInput(item)"
      @keyup.delete="deleteInput(item)" text-center input p-4px w-8 h-8 />
  </div>
</template>
