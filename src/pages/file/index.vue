<script setup lang="ts">
import type { chunksType, myFIle } from '~/type/upload'

const {
  fileToBuffer,
  getSuffix,
  getSpark,
  getChunksNumber,
  getChunks,
} = useSliceUpload()
const upload = ref<myFIle>()
const percent = ref(0)
const percentCount = ref(0)
const progressWidth = ref(0)
const total = ref(0)
async function onChange() {
  const files = Array.from(upload.value!.files)
  files.forEach((file: File) => {
    startUpload(file)
  })
}

async function startUpload(file: File) {
  const buffer = await fileToBuffer(file) as ArrayBuffer
  const suffix = getSuffix(file)
  const md5 = getSpark(buffer)
  const chunksNumber = getChunksNumber(buffer)
  total.value += chunksNumber
  const chunks: chunksType[] = getChunks(buffer, file, md5, suffix)
  onUpload(chunks, md5, suffix)
}

function onUpload(chunks: chunksType[], md5: string, suffix: string) {
  const requestList: (() => any)[] = []
  chunks.forEach((item: chunksType, index: Number) => {
    const fn = async () => {
      const formData = new FormData()
      formData.append('file', item.chunk)
      formData.append('name', item.name)
      const res: any = await chunkFile(formData)
      if (res.data.code === 1) {
        percentCount.value += 1
        percent.value = Math.floor((percentCount.value / total.value) * 100)
        chunks.splice(index as number, 1)
        progressWidth.value += 100 / total.value * 3.2
      }
    }
    requestList.push(fn)
  })
  startRequest(requestList, md5, suffix)
}

async function startRequest(requestList: (() => any)[], md5: string, suffix: string) {
  requestList.forEach(async (fn: () => any, index: number) => {
    await fn()
    if (index === requestList.length - 1) {
      mergeFile({
        hash: md5,
        name: `${md5}.${suffix}`,
      })
    }
  })
}

function clickUpload() {
  const input = document.querySelector<HTMLInputElement>('input[type="file"]')
  input!.dispatchEvent(new MouseEvent('click'))
}
</script>

<template>
  <div flex flex-col gap-10px m-auto max-w-360px>
    <div btn w-100px @click="clickUpload">
      <div flex items-center justify-center gap-5px>
        <div i-carbon:cloud-upload /><span>上传</span>
      </div>
    </div>
    <div flex flex-row items-center justify-center gap-10px>
      <div h-6px w-320px rounded="4px" bg="#e7e7e9">
        <div h-full w-0 rounded="3px" bg="#6cb6ff" transition-300 transition-ease :style="`width:${progressWidth}px`" />
      </div>
      <span>{{ percent }}%</span>
    </div>
  </div>
  <input ref="upload" type="file" hidden multiple @change="onChange">
</template>
