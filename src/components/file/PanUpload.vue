<script setup lang="ts">
const props = withDefaults(defineProps<{
  multiple?: boolean
  accept?: string | undefined
  size?: number
  chunk?: boolean
}>(), {
  multiple: true,
  chunk: false,
})

const emits = defineEmits(['change'])
const {
  fileToBuffer,
  getHash,
  getChunks,
} = useSliceUpload(props.size)

const { files, open } = useFileDialog({
  multiple: props.multiple,
  accept: props.accept,
})

const list = ref<UpLoadList[]>([])

const chunkFiles = async () => {
  for (const file of files.value as any) {
    const buffer = await fileToBuffer(file) as ArrayBuffer
    const hash = getHash(buffer)
    const chunks = getChunks(buffer, file)
    list.value.push({
      chunks,
      total: chunks.length,
      hash,
      size: file.size,
      name: file.name,
      type: file.type,
    })
  }
}

watch(files, async () => {
  if (props.chunk)
    await chunkFiles()

  emits('change', props.chunk ? list : files)
})
</script>

<template>
  <div @click="open()">
    <slot />
  </div>
</template>
