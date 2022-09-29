<script setup lang="ts">
import type { Ref } from 'vue'
const { t } = useI18n()
const direction = ref('horizontal')
const funs = ref<Function[]>([])
const upload = async (files: Ref<UpLoadList[]>) => {
  files.value.forEach((item) => {
    item.chunks.forEach((items, index) => {
      const fun = async () => {
        const fd = new FormData()
        fd.append('fileName', item.name)
        fd.append('hash', item.hash)
        fd.append('total', item.total.toString())
        fd.append('idx', (index + 1).toString())
        fd.append('fileSize', item.size.toString())
        fd.append('file', items)
        fd.append('start', (index * 1024 * 1024).toString())
        await uploadFile(fd)
      }
      funs.value.push(fun)
    })
  })
  for await (const fun of funs.value)
    await fun()
}
const progress = ref(20)
setInterval(() => {
  progress.value++
}, 1000)
</script>

<template>
  <div>
    <span text-xl @click="direction = 'vertical'">{{ t('intro.home.title') }}</span>
    <RouterLink to="/login">
      login
    </RouterLink>
    <PanSwiper :direction="direction">
      <PanSwiperItem v-for="item in 4" :key="item" bg-blue-300 w-300px :item-key="item">
        {{ item }}
      </PanSwiperItem>
    </PanSwiper>
    <PanUpload chunk @change="upload">
      <button btn>
        上传
      </button>
    </PanUpload>
    <PanProgress v-model="progress" text="进度条" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
