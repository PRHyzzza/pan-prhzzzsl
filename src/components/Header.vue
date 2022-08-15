<script setup lang='ts'>
const route = useRoute()
console.log(route)
</script>

<template>
  <header flex flex-row justify-between items-center py-2 px-4>
    <h1>Header</h1>
    <div flex flex-row gap-2 text-sm>
      <div class="header_active">
        <router-link to="/">
          Home
        </router-link>
      </div>
      <div>
        <router-link to="/about">
          About
        </router-link>
      </div>
      <button class="icon-btn !outline-none text-xl" title="切换主题" @click="toggleDark()">
        <div i="carbon-sun dark:carbon-moon" />
      </button>
      <a class="icon-btn text-xl" rel="noreferrer" href="https://github.com/PRHyzzza" target="_blank" title="GitHub">
        <div i-carbon-logo-github />
      </a>
    </div>
  </header>
</template>

<style>
.header_active {
  border-bottom: 2px solid #0d9488;
}
</style>
