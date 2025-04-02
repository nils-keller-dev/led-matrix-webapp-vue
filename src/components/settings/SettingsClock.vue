<script lang="ts" setup>
import { patchState } from '../../api/state.patch'
import { useStore } from '../../store/store'
import { hexToRgb, rgbToHex } from '../../utils/ColorConversion'
import UiColorInput from '../ui/UiColorInput.vue'
import UiWrapper from '../ui/UiWrapper.vue'
import UiSlider from '../ui/UiSlider.vue'

defineProps<{
  color: number[]
  backgroundColor: number[]
  backgroundBrightness: number
}>()

const store = useStore()

const updateColor = (color: string) => {
  const rgbColor = hexToRgb(color)
  patchState({ clock: { color: rgbColor } }).then(() => {
    store.state!.clock.color = rgbColor
  })
}

const updateBackgroundColor = (backgroundColor: string) => {
  const rgbColor = hexToRgb(backgroundColor)
  patchState({ clock: { backgroundColor: rgbColor } }).then(() => {
    store.state!.clock.backgroundColor = rgbColor
  })
}

const updateBrightness = (backgroundBrightness: number) => {
  patchState({ clock: { backgroundBrightness } }).then(() => {
    store.state!.clock.backgroundBrightness = backgroundBrightness
  })
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <UiWrapper title="Text" html-for="text">
      <UiColorInput
        id="text"
        :model-value="rgbToHex(color)"
        @update:model-value="updateColor"
      />
    </UiWrapper>

    <div
      class="border-secondary flex flex-col items-center justify-between rounded-md border"
    >
      <div class="relative flex w-full justify-between gap-4 px-4 py-3">
        <label class="absolute top-0 left-0 size-full" for="background" />
        <span class="text-muted-foreground">Background</span>
        <UiColorInput
          id="background"
          :model-value="rgbToHex(backgroundColor)"
          @update:model-value="updateBackgroundColor"
        />
      </div>
      <div class="flex w-full items-center justify-between gap-4 px-4 py-3">
        <span class="text-muted-foreground">Brightness</span>
        <div class="w-55 max-w-55">
          <UiSlider
            :min="0"
            :max="100"
            :model-value="backgroundBrightness"
            @update:model-value="updateBrightness"
          />
        </div>
      </div>
    </div>
  </div>
</template>
