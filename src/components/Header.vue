<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const show = ref(false)
const { userInfo } = storeToRefs(useUserStore())

const menuList = ref([
  {
    name: 'home',
    url: '/',
  },
  {
    name: 'about',
    url: '/about',
  },
])
</script>

<template>
  <header flex flex-row justify-between items-center p="2 sm:x-4">
    <h1>
      Header
    </h1>
    <div hidden sm:flex flex-row gap-4 text-sm items-center>
      <div
        v-for="item in menuList" :key="item.url" :class="{ header_active: route.path === item.url }"
        hover="text-teal-600"
      >
        <router-link :to="item.url">
          {{ t(`button.${item.name}`) }}
        </router-link>
      </div>
      <button class="icon-btn !outline-none text-xl" title="切换主题" @click="toggleDark()">
        <div i="carbon-sun dark:carbon-moon" />
      </button>
      <a class="icon-btn text-xl" rel="noreferrer" href="https://github.com/PRHyzzza" target="_blank" title="GitHub">
        <div i-carbon-logo-github />
      </a>
      <template v-if="userInfo?.token">
        <img :src="userInfo.avatar" w24px h24px>
        <button btn py1 px3 text-3 @click="useUserStore().loginOut">
          退出
        </button>
      </template>
      <RouterLink v-else to="/login" btn py1 px3 text-3>
        登录
      </RouterLink>
    </div>
    <button sm:hidden i-carbon:menu text-xl @click="show = true" />
    <PanDrawer :show="show" @close="show = false" @handle-close="show = false">
      121
    </PanDrawer>
  </header>
</template>

<style>
.header_active {
  border-bottom: 2px solid #0d9488;
}
</style>
