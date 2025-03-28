<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  placeholder?: string
  initialValue: string
}>()

const emit = defineEmits<{
  change: [value: string]
}>()

const value = ref(props.initialValue)

const handleChange = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  value.value = target.value
  emit('change', value.value)
}

const onKeyDown = (event: KeyboardEvent) => {
  const target = event.target as HTMLTextAreaElement
  target.blur()
}
</script>

<template>
  <textarea
    v-model="value"
    :placeholder="placeholder"
    enterkeyhint="send"
    class="bg-background text-primary resize-none w-full h-[130px] border border-secondary rounded-md outline-hidden py-3 px-4"
    @blur="handleChange"
    @keydown.enter.stop.prevent="onKeyDown"
    @pointermove.stop
  />
</template>
