<script setup lang="ts">
const isSwitch = ref<boolean>(true)
const captcha = ref<string>()
const loginRef = ref()
const { saveUserInfo } = useUserStore()
const loginForm = ref<login>({
  userCode: '',
  password: '',
})

const loginRules = {
  userCode: [
    { required: true, message: '请输入用户名' },
    { min: 3, message: '用户名最少3位' },
    { max: 10, message: '用户名最多10位' },
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 3, message: '密码最少3位' },
    { max: 10, message: '密码最多10位' },
  ],
  captcha: [
    { required: true, message: '请输入验证码' },
    { min: 4, message: '请输入验证码' },
  ],
}

const getCaptcha = () => {
  loginForm.value.nonceStr = randomString().value
  captcha.value = `${import.meta.env.VITE_API_BASE_URL}public/getCaptcha?nonceStr=${loginForm.value.nonceStr}`
}

const bindLogin = () => {
  loginRef.value.validate().then(async () => {
    const res: any = await wwwLogin(loginForm.value)
    if (res.code === 1) {
      saveUserInfo(res.data)
    }
    else {
      getCaptcha()
      console.error('登录失败')
    }
  }).catch(() => {
    console.warn('请输入账号密码')
  })
}

onMounted(() => {
  getCaptcha()
})
</script>

<template>
  <div flex flex-col gap-20px justify-center items-center>
    <Transition>
      <div v-if="isSwitch" mt16>
        <PanForm ref="loginRef" :model="loginForm" :rules="loginRules">
          <PanFormItem lable="用户名" prop="userCode">
            <PanInput v-model="loginForm.userCode" w240px form placeholder="请输入用户名" />
          </PanFormItem>
          <PanFormItem lable="密码" prop="password">
            <PanInput v-model="loginForm.password" w240px form placeholder="请输入密码" type="password" />
          </PanFormItem>
          <PanFormItem lable="验证码" prop="captcha">
            <PanInput v-model="loginForm.captcha" w160px form placeholder="请输入验证码" />
            <img w80px ml-4 cursor-pointer :src="captcha" @click="getCaptcha()">
          </PanFormItem>
          <button btn @click="bindLogin">
            登录
          </button>
        </PanForm>
      </div>
      <div v-else>
        register
      </div>
    </Transition>
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
