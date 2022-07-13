<script setup lang="ts">
import Schema, { Rules } from 'async-validator';
import emitter from '~/utils/emitter'
const props = withDefaults(defineProps<{
  lable: string,
  prop: string
}>(), {

})
emitter.emit('formItem', props.prop)

const parent: any = inject('form')
const errorMessage = ref();

emitter.on('validate', (val) => {
  console.log(val);
  
  const { model, rules } = parent

  rules[val].map((item: Rules) => {
    const schema = new Schema({ [val]: item })
    schema.validate({ [val]: model[val] }, (errors, fields) => {
      if (errors) {
        errorMessage.value = errors[0].message
      } else {
        errorMessage.value = ''
      }
    })
  })
})

</script>

<template>
  <div flex flex-row items-center mb-6>
    <span v-if="lable" w-80px text-start>{{ lable }}</span>
    <slot></slot>
    <span v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

