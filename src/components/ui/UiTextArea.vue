<script lang="ts" setup>
defineProps<{
  placeholder?: string
}>()

const value = defineModel<string>({ required: true })

const onKeyDown = (event: KeyboardEvent) => {
  const target = event.target as HTMLTextAreaElement
  target.blur()
}
</script>

<template>
  <textarea
    v-model.lazy="value"
    :placeholder
    enterkeyhint="send"
    class="bg-background text-primary border-secondary h-[130px] w-full resize-none rounded-md border px-4 py-3 outline-hidden"
    @keydown.enter.stop.prevent="onKeyDown"
    @pointermove.stop
  />
</template>
