<script lang="ts" setup>
import { patchState } from '@/api/state.patch'
import UiWrapper from '@/components/ui/UiWrapper.vue'
import { useStore } from '@/store/store'
import UiSlider from '../ui/UiSlider.vue'

defineProps<{
  brightness: number
}>()

const store = useStore()

const updateBrightness = (brightness: number) => {
  patchState({ adaptiveBrightness: { brightness } }).then(() => {
    store.state!.adaptiveBrightness.brightness = brightness
  })
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <UiWrapper title="Brightness">
      <div class="w-55">
        <UiSlider
          :min="3"
          :max="100"
          :model-value="brightness"
          @update:model-value="updateBrightness"
        />
      </div>
    </UiWrapper>
  </div>
</template>
