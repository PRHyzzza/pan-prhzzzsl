<script setup lang="ts">
import emitter from '~/utils/emitter'
withDefaults(defineProps<{
  placeholder?: string,
  modelValue?: number | string,
  type?: 'text' | 'password',
}>(), {
  placeholder: '',
  type: 'text',
})
const emits = defineEmits(['update:modelValue'])
const parent: any = inject('propVal')

function input(event: Event) {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
  emitter.emit('validate', parent.prop)
}
</script>

<template>
  <div flex flex-row gap-10px items-center>
    <input autocomplete="false" p="x4 y2" input :placeholder="placeholder" :value="modelValue" @input="input($event)"
      :type="type" @blur="emitter.emit('validate', parent.prop)" />
  </div>

</template>
