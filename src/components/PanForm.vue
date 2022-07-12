<script setup lang="ts">
import Schema from "async-validator";
const props = defineProps({
  model: Object,
  rules: {
    type: Object,
    required: true
  },
})
const validatorRef = ref<boolean>(false)

const validator = new Schema(props.rules);
validator.validate({ username: 'Firstname' }, (errors, fields) => {
  if (errors) {
    console.log(errors);
  }
  // validation passed
});
defineExpose({
  validatorRef,
})
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
