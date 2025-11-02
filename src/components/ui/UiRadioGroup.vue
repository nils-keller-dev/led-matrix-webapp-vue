<script lang="ts" setup>
import type { FunctionalComponent } from 'vue'

defineProps<{
  icons: Array<FunctionalComponent>
  values: Array<string>
}>()

const selected = defineModel<string>({ required: true })
</script>

<template>
  <div class="flex gap-2">
    <label
      v-for="(value, index) in values"
      :key="value"
      class="has-checked:bg-secondary flex size-10 items-center justify-center rounded-md"
    >
      <input v-model="selected" type="radio" class="hidden" :value />
      <Component :is="icons[index]" />
    </label>
  </div>
</template>
