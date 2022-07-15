<script setup lang="ts">
const isSwitch = ref<boolean>(true)
const show = ref<boolean>(false)
const loginForm = ref({
  username: '111',
  password: '111',
  code: '',
})

const fu = (): void => {
  console.log('关闭model')
}

onMounted(() => {

})
</script>

<template>
  <div flex flex-col gap-20px justify-center items-center>
    <div flex flex-row gap-20px justify-center items-center>
      <div btn @click="isSwitch = true">
        登录
      </div>
      <div btn @click="isSwitch = false">
        注册
      </div>
    </div>

    <Transition>
      <div v-if="isSwitch">
        <PanInput v-model="loginForm.username" mb-10px />
        <PanInput v-model="loginForm.password" type="password" />
      </div>
      <div v-else>
        register
      </div>
    </Transition>
    <PanModal :show="show" :is-mask="true" @handle-close="show = false" @close="fu" />
    <div btn @click="show = true">
      跳出
    </div>
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
