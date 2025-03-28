<script lang="ts" setup>
import type { FunctionalComponent } from 'vue'

defineProps<{
  icons: Array<FunctionalComponent>
  values: Array<string>
  selected: string
}>()

defineEmits<{
  change: [value: string]
}>()
</script>

<template>
  <div class="flex gap-2">
    <label
      v-for="(value, index) in values"
      :key="value"
      class="size-10 flex justify-center items-center rounded-md has-checked:bg-secondary"
      :for="value"
    >
      <input
        :id="value"
        type="radio"
        class="hidden peer"
        :checked="selected == value"
        name="align"
        @change="$emit('change', value)"
      />
      <component :is="icons[index]" />
    </label>
  </div>
</template>
