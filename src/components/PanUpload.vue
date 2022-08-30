<script setup lang="ts">
const props = withDefaults(defineProps<{
  multiple?: boolean
  accept?: string | undefined
  size?: number
}>(), {
  multiple: true,
})
const emits = defineEmits(['onChange'])
const {
  fileToBuffer,
  getHash,
  getChunks,
} = useSliceUpload(props.size)
const { files, open } = useFileDialog({
  multiple: props.multiple,
  accept: props.accept,
})
watch(files, async (newFiles) => {
  emits('onChange', newFiles)
  for (const file of newFiles!) {
    const buffer = await fileToBuffer(file) as ArrayBuffer
    const md5 = getHash(buffer)
    const chunks = getChunks(buffer, file)
    console.log(md5, chunks)
  }
})
const num = ref(0)
const width = computed(() => {
  return { '--item-width': `${num.value / 10 * 100}%` }
})
</script>

<template>
  <button btn type="button" @click="open()">
    上传文件
  </button>
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
