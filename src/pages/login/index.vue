<script setup lang="ts">
const isSwitch = ref<boolean>(true)
const show = ref<boolean>(false)
const loginForm = reactive({
  username: '',
  password: '',
})
const code = ref()

const fu = (): void => {
  console.log("关闭model")
}
</script>

<template>
  <div flex flex-col gap-20px justify-center items-center>
    <div flex flex-row gap-20px justify-center items-center>
      <div @click="isSwitch = true" btn>登录</div>
      <div @click="isSwitch = false" btn>注册</div>
    </div>

    <Transition>
      <div v-if="isSwitch">
        <PanInput v-model="loginForm.username" mb-10px />
        <PanInput v-model="loginForm.password" type="password" />
      </div>
      <div v-else="!isSwitch">
        register
      </div>
    </Transition>
    <PanCode v-model="code" :code-num="4" />
    <PanModal :show="show" @handle-close="show = false" @close="fu" :is-mask="true"></PanModal>
    <div btn @click="show = true">跳出</div>
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
