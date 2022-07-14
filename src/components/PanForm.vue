<script setup lang="ts">
import type { RuleItem } from 'async-validator'
import Schema from 'async-validator'
import emitter from '~/utils/emitter'
const props = withDefaults(defineProps<{
  model: object
  rules: Record<string, RuleItem[]>
}>(), {

})
const fields = ref<string[]>([])
provide('form', props)
emitter.on('fields', (val) => {
  if (!val)
    return
  fields.value.push(val)
})

const validatorRef = () => new Promise((resolve, reject) => {
  // 从props.model的keys与fields比较
  const keys = Object.keys(props.model)
  const diff: string[] = keys.filter(item => fields.value.includes(item))
  const obj = ref<Record<string, RuleItem[]>>({})
  diff.forEach((item: string) => {
    obj.value[item] = props.rules[item]
  })
  if (!obj.value)
    return
  const validator = new Schema(obj.value)
  validator.validate(props.model, (errors, fields) => {
    if (errors) {
      console.warn('validator error', errors)
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(false)
    }
    else {
      resolve(true)
    }
    emitter.emit('validateAll')
  })
})
defineExpose({
  validatorRef,
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
