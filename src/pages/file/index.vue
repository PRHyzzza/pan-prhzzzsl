<script setup lang="ts">
import axios from 'axios';
import SparkMD5 from 'spark-md5';
interface myFIle {
  files: File[]
}
const upload = ref<myFIle>()

async function onChange() {
  let buffer: any = await fileToBuffer(upload.value!.files[0]);
  const chunkSize = 2 * 1024 * 1024;
  const chunks = [];
  const suffix = upload.value!.files[0].name.split('.').pop();
  const spark = new SparkMD5.ArrayBuffer();
  spark.append(buffer);
  const md5 = spark.end();
  for (let i = 0; i < buffer.byteLength; i += chunkSize) {
    chunks.push({
      chunk: upload.value!.files[0].slice(i, i + chunkSize),
      name: `${md5}-${i / chunkSize}.${suffix}`,
    });
    if (i + chunkSize > buffer.byteLength) {
      console.log('结束了');
    }
  }
  chunks.forEach(async (chunk, index) => {
    const formData = new FormData()
    formData.append('file', chunk.chunk)
    formData.append('name', chunk.name)
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    const r = await axios.post('http://localhost:8081/public/chunk', formData);
    console.log(r);
  });
}
function clickUpload() {
  const input = document.querySelector<HTMLInputElement>('input[type="file"]')
  input!.dispatchEvent(new MouseEvent('click'))
}

function fileToBuffer(file: File) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = e => {
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
  <div @click="clickUpload" cursor-pointer>
    上传
    <input type="file" multiple @change="onChange" ref="upload" hidden />
  </div>
</template>
