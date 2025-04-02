<script setup lang="ts">
import UiSlider from '@/components/ui/UiSlider.vue'
import { Sun, SunDim } from 'lucide-vue-next'

const brightness = defineModel<number>({ required: true })
</script>

<template>
  <div class="flex w-full flex-col gap-5 p-7">
    <div class="flex flex-row gap-3">
      <SunDim class="text-muted-foreground shrink-0" />
      <UiSlider v-model="brightness" :min="3" :max="100" />
      <Sun class="text-muted-foreground shrink-0" />
    </div>
  </div>
</template>
