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
  <UiTextArea
    v-model.lazy="value"
    :placeholder="placeholder"
    enterkeyhint="send"
    class="bg-background text-primary resize-none w-full h-[130px] border border-secondary rounded-md outline-hidden py-3 px-4"
    @keydown.enter.stop.prevent="onKeyDown"
    @pointermove.stop
  />
</template>
