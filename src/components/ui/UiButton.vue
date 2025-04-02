<script lang="ts" setup>
defineProps<{
  text: string
  isSecondary?: boolean
}>()
</script>

<template>
  <button
    class="rounded-md border px-4 py-2 outline-hidden"
    :class="
      isSecondary ? 'border-muted-foreground' : 'bg-primary text-background'
    "
  >
    {{ text }}
  </button>
</template>
