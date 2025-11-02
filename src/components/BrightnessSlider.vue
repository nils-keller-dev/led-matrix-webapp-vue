<script lang="ts" setup>
import { Sun, SunDim } from 'lucide-vue-next'
import UiSlider from '@/components/ui/UiSlider.vue'

const { min = 0, max = 100 } = defineProps<{
  min?: number
  max?: number
}>()

const value = defineModel<number>({ required: true })
</script>

<template>
  <div class="flex shrink-0 grow flex-row items-center gap-3">
    <SunDim class="text-muted-foreground shrink-0" />
    <UiSlider v-model="value" :min :max />
    <Sun class="text-muted-foreground shrink-0" />
  </div>
</template>
