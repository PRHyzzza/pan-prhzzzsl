<script setup lang="ts">
import schema from 'async-validator'
const props = defineProps({
  model: Object,
  rules: {
    type: Object,
    required: true
  },
})
const validatorRef = ref<boolean>(false)

const validator = new schema(props.rules)

watch(() => props.model, (val) => {

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
