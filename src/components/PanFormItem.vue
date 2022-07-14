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
  <div class="form-item" flex flex-row items-center mb-6>
    <span v-if="lable" w-80px text-start>{{ lable }}</span>
    <slot />
    <span v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

