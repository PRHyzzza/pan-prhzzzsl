<script setup lang="ts">
const isSwitch = ref<boolean>(true)
const show = ref<boolean>(false)
const captcha = ref<string>()
const nonceStr = ref<string>()
const loginForm = ref({
  username: '111',
  password: '111',
  code: '',
})

const loginRules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 3, message: '用户名最少3位' },
    { max: 10, message: '用户名最多10位' },
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 3, message: '密码最少3位' },
    { max: 10, message: '密码最多10位' },
  ],
  code: [
    { required: true, message: '请输入验证码' },
  ],
}

const fu = (): void => {
  console.log('关闭model')
}

const getCaptcha = () => {
  nonceStr.value = randomString().value
  captcha.value = `${import.meta.env.VITE_API_BASE_URL}public/getCaptcha?nonceStr=${nonceStr.value}`
}

onMounted(() => {
  getCaptcha()
})
</script>

<template>
  <div flex flex-col gap-20px justify-center items-center>
    <Transition>
      <div v-if="isSwitch" mt16>
        <PanForm ref="form" :model="loginForm" :rules="loginRules">
          <PanFormItem lable="用户名" prop="username">
            <PanInput v-model="loginForm.username" w240px form placeholder="请输入用户名" />
          </PanFormItem>
          <PanFormItem lable="密码" prop="password">
            <PanInput v-model="loginForm.password" w240px form placeholder="请输入密码" />
          </PanFormItem>
          <PanFormItem lable="验证码" prop="code">
            <PanCode v-model="loginForm.code" form :code-num="4" />
            <img w80px ml-4 :src="captcha" @click="getCaptcha()">
          </PanFormItem>
        </PanForm>
      </div>
      <div v-else>
        register
      </div>
    </Transition>
    <PanModal :show="show" @handle-close="show = false" @close="fu" />
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
