<script setup lang="ts">
import { patchState } from '@/api/state.patch'
import BrightnessSlider from '@/components/BrightnessSlider.vue'
import { useStore } from '@/store/store'

const store = useStore()

const onChangeBrightness = (current: number) => {
  patchState({ global: { brightness: { current } } })
}
</script>

<template>
  <BrightnessSlider
    class="p-7"
    :model-value="store.state!.global.brightness!.current!"
    :min="3"
    @update:model-value="onChangeBrightness"
  />
</template>
