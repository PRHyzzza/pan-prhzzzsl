<script setup lang="ts">
const props = withDefaults(defineProps<{
  multiple?: boolean
  accept?: string | undefined
}>(), {
  multiple: true,
})
const emits = defineEmits(['onChange'])
const { files, open } = useFileDialog({
  multiple: props.multiple,
  accept: props.accept,
})
watch(files, async (newFiles) => {
  emits('onChange', newFiles)
})
</script>

<template>
  <button btn type="button" @click="open()">
    Choose file
  </button>
  <template v-if="files">
    <li v-for="file of files" :key="file.name">
      {{ file.name }}
    </li>
  </template>
</template>
