<script lang="ts" setup>
defineProps<{
  text: string
  isSecondary?: boolean
}>()
</script>

<template>
  <button
    class="outline-hidden border rounded-md px-4 py-2"
    :class="
      isSecondary ? 'border-muted-foreground' : 'bg-primary text-background'
    "
  >
    {{ text }}
  </button>
</template>
