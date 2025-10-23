<script lang="ts" setup>
import type { FunctionalComponent } from 'vue'

const value = defineModel<boolean>({ required: true })

defineProps<{
  icon: FunctionalComponent
}>()
</script>

<template>
  <label
    class="text-muted-foreground border-secondary flex size-10 items-center justify-center rounded-md border"
    :class="{
      'bg-secondary': value
    }"
  >
    <input v-model="value" type="checkbox" class="hidden" />
    <component :is="icon" />
  </label>
</template>
