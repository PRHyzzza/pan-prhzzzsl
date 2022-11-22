<script setup lang='ts'>
import type { Ref } from 'vue'

const onChange = (file: Ref<UpLoadList[]>) => {
  console.log(file.value[0])
}
</script>

<template>
  <PanUpload chunk @change="onChange">
    <button btn>
      上传
    </button>
  </PanUpload>
</template>
