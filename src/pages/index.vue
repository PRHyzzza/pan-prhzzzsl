<script setup lang="ts">
const { t } = useI18n()
const direction = ref('horizontal')
const up = (aa: UpLoadList[] | FileList) => {
  console.log(aa)
}
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
    <PanUpload chunk @change="up">
      <button btn>
        上传
      </button>
    </PanUpload>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
