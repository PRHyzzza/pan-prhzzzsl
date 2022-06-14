<script setup lang="ts">
interface myFIle {
  files: File[]
}
const upload = ref<myFIle>()

function onChange() {
  console.log(upload.value!.files);
}
function clickUpload() {
  const input = document.querySelector<HTMLInputElement>('input[type="file"]')
  input!.dispatchEvent(new MouseEvent('click'))
}
</script>

<template>
  <div @click="clickUpload">
    上传
    <input type="file" multiple @change="onChange" ref="upload" hidden />
  </div>

</template>
