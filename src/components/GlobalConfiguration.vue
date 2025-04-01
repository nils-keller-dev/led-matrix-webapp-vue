<script setup lang="ts">
import { Sun, SunDim } from 'lucide-vue-next'
import TheSlider from './TheSlider.vue'

const brightness = defineModel<number>({ required: true })
</script>

<template>
  <div className="flex flex-col gap-5 w-full p-7">
    <div className="flex gap-3 flex-row">
      <SunDim class="text-muted-foreground shrink-0" />
      <TheSlider v-model="brightness" :min="3" :max="100" />
      <Sun class="text-muted-foreground shrink-0" />
    </div>
  </div>
</template>
