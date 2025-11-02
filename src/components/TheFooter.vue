<script setup lang="ts">
import { patchState } from '@/api/state.patch'
import UiSlider from '@/components/ui/UiSlider.vue'
import { useStore } from '@/store/store'
import { Sun, SunDim } from 'lucide-vue-next'

const store = useStore()

const onChangeBrightness = (brightness: number) => {
  patchState({ global: { brightness } })
}
</script>

<template>
  <div class="flex w-full gap-5 p-7">
    <div class="flex shrink-0 grow flex-row items-center gap-3">
      <SunDim class="text-muted-foreground shrink-0" />
      <UiSlider
        :model-value="store.state!.global.brightness!"
        @update:model-value="onChangeBrightness"
        :min="3"
        :max="100"
      />
      <Sun class="text-muted-foreground shrink-0" />
    </div>
  </div>
</template>
