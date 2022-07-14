<script setup lang="ts">
const isSwitch = ref<boolean>(true)
const show = ref<boolean>(false)
const form = ref()
const loginForm = ref({
  username: '',
  password: '',
  code: '',
})

const fu = (): void => {
  // eslint-disable-next-line no-console
  console.log('关闭model')
}

onMounted(() => {

})

const v = () => {
  form.value.validatorRef().then((result: boolean) => {
    // eslint-disable-next-line no-console
    console.log(result)
  }).catch((err: boolean) => {
    // eslint-disable-next-line no-console
    console.log(err)
  })
}
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

    <PanForm
      ref="form" :rules="{
        username: [{ required: true, message: '请输入账号' }],
        password: [{ required: true, message: '请输入密码' }, { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }],
        code: [{ required: true, message: '请输入密码' }],
      }" :model="loginForm"
    >
      <PanFormItem lable="用户名" prop="username">
        <PanInput v-model="loginForm.username" />
      </PanFormItem>
      <PanFormItem lable="密码" prop="password">
        <PanInput v-model="loginForm.password" type="password" />
      </PanFormItem>
      <PanFormItem lable="验证码">
        <PanCode v-model="loginForm.code" :code-num="4" />
      </PanFormItem>
      <PanFormItem>
        <div btn @click="v">
          aaa
        </div>
      </PanFormItem>
    </PanForm>
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
