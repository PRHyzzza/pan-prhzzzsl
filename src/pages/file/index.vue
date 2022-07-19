<script setup lang="ts">
import SparkMD5 from 'spark-md5'
interface myFIle {
  files: File[]
}
interface chunksType {
  chunk: Blob
  name: string
}
const upload = ref<myFIle>()
const chunkSizeRef = ref(2 * 1024 * 1024)
const percent = ref<Number>(0)
const percentCount = ref(0)
const chunks = ref<any>([])
const md5 = ref<string>()
const suffix = ref<string>()
const requestList = ref<Function[]>([])
const chunksSize = ref<number>(0)
const progressWidth = ref<number>(0)
async function onChange() {
  const buffer: any = await fileToBuffer(upload.value!.files[0])
  const chunkSize = chunkSizeRef.value
  suffix.value = upload.value!.files[0].name.split('.').pop()
  const spark = new SparkMD5.ArrayBuffer()
  spark.append(buffer)
  md5.value = spark.end()
  chunksSize.value = Math.ceil(buffer.byteLength / chunkSize)
  for (let i = 0; i < buffer.byteLength; i += chunkSize) {
    chunks.value.push({
      chunk: upload.value!.files[0].slice(i, i + chunkSize),
      name: `${md5.value}-${i / chunkSize}.${suffix.value}`,
    })
    if (chunks.value.length === chunksSize.value)
      onUpload()
  }
}

function onUpload() {
  chunks.value.forEach((chunk: chunksType, index: Number) => {
    const fn = async () => {
      const formData = new FormData()
      formData.append('file', chunk.chunk)
      formData.append('name', chunk.name)
      axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      const res: any = await axios.post('http://localhost:8081/public/chunk', formData)
      if (res.data.code === 1) {
        percentCount.value += 1
        percent.value = Math.floor((percentCount.value / chunksSize.value) * 100)
        chunks.value.splice(index, 1)
        progressWidth.value += 100 / chunksSize.value * 3.2
      }
    }
    requestList.value.push(fn)
    if (requestList.value.length === chunksSize.value)
      startRequest()
  })
}

async function startRequest() {
  if (percentCount.value + 1 === chunksSize.value) {
    percent.value = 100
    progressWidth.value = 100 * 3.2
    axios.post('http://localhost:8081/public/merge', {
      hash: md5.value,
      name: `${md5.value}.${suffix.value}`,
    })
    return
  }
  await requestList.value[percentCount.value]()
  if (percentCount.value !== chunksSize.value)
    startRequest()
}

function clickUpload() {
  const input = document.querySelector<HTMLInputElement>('input[type="file"]')
  input!.dispatchEvent(new MouseEvent('click'))
}

function fileToBuffer(file: File) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = (e) => {
      resolve(e.target!.result)
    }
    fr.readAsArrayBuffer(file)
    fr.onerror = () => {
      reject(new Error('转换文件格式发生错误'))
    }
  })
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
  <input ref="upload" type="file" hidden @change="onChange">
</template>
