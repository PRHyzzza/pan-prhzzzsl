<script setup lang="ts">
const isSwitch = ref<Boolean>(true)
const loginForm = reactive({
  username: '',
  password: '',
})
const code = ref()
</script>

<template>
  <div flex flex-col gap-20px justify-center items-center>
    <div flex flex-row gap-20px justify-center items-center>
      <div @click="isSwitch = true" btn>登录</div>
      <div @click="isSwitch = false" btn>注册</div>
    </div>

    <Transition>
      <div v-if="isSwitch">
        <PanInput v-model="loginForm.username" label="用户名" mb-10px />
        <PanInput v-model="loginForm.password" label="密码" type="password" />
      </div>
      <div v-else="!isSwitch">
        register
      </div>
    </Transition>
    <PanCode v-model="code" />
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
