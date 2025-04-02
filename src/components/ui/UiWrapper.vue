<script lang="ts" setup>
defineProps<{
  title: string
  htmlFor?: string
}>()
</script>

<template>
  <div
    class="flex border border-secondary rounded-md items-center justify-between py-3 px-4 relative"
  >
    <label class="size-full absolute left-0" :for="htmlFor" />
    <span class="text-muted-foreground">{{ title }}</span>
    <slot />
  </div>
</template>
