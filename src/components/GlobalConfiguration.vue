<script setup lang="ts">
import { Sun, SunDim } from 'lucide-vue-next'
import TheSlider from './TheSlider.vue'

defineProps<{
  brightness: number
}>()

defineEmits<{
  change: [value: number]
}>()
</script>

<template>
  <div className="flex flex-col gap-5 w-full p-7">
    <div className="flex gap-3 flex-row">
      <SunDim class="text-muted-foreground shrink-0" />
      <TheSlider
        :min="3"
        :max="100"
        :initial-value="brightness"
        @change="$emit('change', $event)"
      />
      <Sun class="text-muted-foreground shrink-0" />
    </div>
  </div>
</template>
