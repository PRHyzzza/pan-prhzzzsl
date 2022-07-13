<script setup lang="ts">
import Schema, { RuleItem } from "async-validator";

const props = withDefaults(defineProps<{
  model: object,
  rules: Record<string, RuleItem[]>,
}>(), {

})

provide('form', props)

const validator = new Schema(props.rules);

const validatorRef = new Promise((resolve, reject) => {
  validator.validate(props.model, (errors, fields) => {
    if (errors) {
      reject(false)
    } else {
      resolve(true)
    }
  })
})


defineExpose({
  validatorRef,
})
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
