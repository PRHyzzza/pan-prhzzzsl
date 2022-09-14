<script setup lang="ts">
const isSwitch = ref<boolean>(true)
const show = ref<boolean>(false)
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
        <PanForm :model="loginForm" :rules="loginRules">
          <PanFormItem lable="用户名" prop="username">
            <PanInput v-model="loginForm.username" form placeholder="请输入用户名" />
          </PanFormItem>
          <PanFormItem lable="密码" prop="password">
            <PanInput v-model="loginForm.password" form placeholder="请输入密码" />
          </PanFormItem>
          <PanFormItem lable="验证码" prop="code">
            <PanCode v-model="loginForm.code" form :code-num="4" />
          </PanFormItem>
        </PanForm>
      </div>
      <div v-else>
        register
      </div>
    </Transition>
    <PanModal :show="show" location="bottom-right" @handle-close="show = false" @close="fu" />
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
