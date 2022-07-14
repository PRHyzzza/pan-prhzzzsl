<script setup lang="ts">
import type { Rules } from 'async-validator'
import Schema from 'async-validator'
import emitter from '~/utils/emitter'
const props = withDefaults(defineProps<{
  lable?: string
  prop?: string | undefined
}>(), {

})
const parent: any = inject('form')
const errorMessage = ref()
provide('form-item', props.prop)
emitter.emit('fields', props.prop)

emitter.on('validate', (val) => {
  if (props.prop !== val)
    return

  const { model, rules } = parent
  rules[val]?.forEach((item: Rules) => {
    const schema = new Schema({ [val]: item })
    schema.validate({ [val]: model[val] }, (errors, fields) => {
      errors ? errorMessage.value = errors[0].message : errorMessage.value = ''
    })
  })
})

emitter.on('validateAll', () => {
  emitter.emit('validate', props.prop)
})

onBeforeUnmount(() => {
  emitter.off('validate')
})
</script>

<template>
  <div class="form-item" flex flex-row items-center mb-6>
    <span v-if="lable" w-80px text-start>{{ lable }}</span>
    <slot />
    <span v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

