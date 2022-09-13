<script setup lang="ts">
import Schema from 'async-validator'
import emitter from '~/utils/emitter'
const props = withDefaults(defineProps<{
  lable?: string
  prop?: string | undefined
}>(), {

})
const form: any = inject('form')
const errorMessage = ref()
const { proxy } = getCurrentInstance() as any
const validate = () => {
  if (!props.prop)
    return
  const rules = form.rules[props.prop]
  const value = form.model[props.prop]
  const validator = new Schema({ [props.prop]: rules })
  return validator.validate({ [props.prop]: value }, (errors) => {
    // errors存在则校验失败
    if (errors) {
      errorMessage.value = errors[0].message
    }
    else {
      // 校验通过
      errorMessage.value = ''
    }
  })
}

const formItem = reactive({
  ...toRefs(props),
  formItemEmitter: emitter,
  validate,
})
provide('formItem', formItem)

onMounted(() => {
  proxy.$sub(`pan.form.item.validate${props.prop}`, validate)
  if (props.prop)
    proxy.$pub('pan.form.addField', formItem)
})

onBeforeUnmount(() => {
  proxy.$unsub(`pan.form.item.validate${props.prop}`)
})
</script>

<template>
  <div flex flex-col mb-1 justify-start>
    <div flex flex-row items-center mb-1>
      <span v-if="props.prop" text-red-400 mr-2>*</span>
      <span v-if="lable" w-70px text-start>{{ lable }}</span>
      <slot />
    </div>
    <span v-if="errorMessage" text="red-400 sm start" pl-22>{{ errorMessage }}</span>
    <div v-else h="1.25rem" w-1 />
  </div>
</template>

