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
  for (const file of files.value!) {
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
const num = ref(0)
const width = computed(() => {
  return { '--item-width': `${num.value / 10 * 100}%` }
})
</script>

<template>
  <div @click="open()">
    <slot />
  </div>
  <template v-if="files">
    <li
      v-for="file of files" :key="file.name" class="file-item" max-w-300px flex flex-row justify-between items-center
      list-none p="x2 y1" gap-20px relative :style="width" rounded
    >
      <p truncate>
        {{ file.name }}
      </p>
      <div flex flex-row>
        <div i-ant-design:close-outlined icon-btn />
        <div i-ant-design:pause-outlined icon-btn />
        <div i-carbon:play-filled-alt icon-btn />
      </div>
    </li>
  </template>
</template>

<style>
.file-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: var(--item-width);
  height: 100%;
  transition: 1s ease-in-out;
  background: var(--item-bg);
  border-radius: 0.25rem;
  opacity: 0.5;
}
</style>
