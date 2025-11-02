<script setup lang="ts">
import { patchState } from '@/api/state.patch'
import BrightnessSlider from '@/components/BrightnessSlider.vue'
import { useStore } from '@/store/store'

const store = useStore()

const onChangeBrightness = (brightness: number) => {
  patchState({ global: { brightness } })
}
</script>

<template>
  <div class="flex w-full gap-5 p-7">
    <BrightnessSlider
      :model-value="store.state!.global.brightness!"
      :min="3"
      @update:model-value="onChangeBrightness"
    />
  </div>
</template>
