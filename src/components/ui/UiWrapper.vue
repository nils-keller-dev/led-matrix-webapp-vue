<script lang="ts" setup>
defineProps<{
  title: string
  htmlFor?: string
}>()
</script>

<template>
  <div
    class="border-secondary relative flex items-center justify-between rounded-md border px-4 py-3"
  >
    <label class="absolute left-0 size-full" :for="htmlFor" />
    <span class="text-muted-foreground">{{ title }}</span>
    <slot />
  </div>
</template>
