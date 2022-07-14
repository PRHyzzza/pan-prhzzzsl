<script setup lang="ts">
import type { RuleItem } from 'async-validator'
import emitter from '~/utils/emitter'
const props = withDefaults(defineProps<{
  model: object
  rules: Record<string, RuleItem[]>
}>(), {

})
const { proxy } = getCurrentInstance() as any
const fields = ref<any>([])
const isValid = ref(false)
const form = reactive<object>({
  formEmitter: emitter,
  ...toRefs(props),
})
provide('form', form)

proxy.$sub('pan.form.addField', (field: any) => {
  field && fields.value.push(field[0])
})

const validate = () => {
  const tasks = fields.value.map((item: { validate: () => any }) => item.validate())
  Promise.all(tasks).then(() => {
    isValid.value = true
  }).catch(() => {
    isValid.value = false
  })
  return isValid.value
}

onBeforeUnmount(() => {
  proxy.$unsub('pan.form.addField')
})

defineExpose({
  validate,
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
