<script lang="ts" setup>
import { patchState } from '../api/state.patch'
import { useStore } from '../store/store'
import { hexToRgb, rgbToHex } from '../utils/ColorConversion'
import ColorInput from './ColorInput.vue'
import InputWrapper from './InputWrapper.vue'
import TheSlider from './TheSlider.vue'

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
    <InputWrapper title="Text" html-for="text">
      <ColorInput
        id="text"
        :model-value="rgbToHex(color)"
        @update:model-value="updateColor"
      />
    </InputWrapper>

    <div
      class="flex flex-col border border-secondary rounded-md items-center justify-between"
    >
      <div class="flex justify-between w-full px-4 py-3 relative gap-4">
        <label class="size-full absolute left-0 top-0" for="background" />
        <span class="text-muted-foreground">Background</span>
        <ColorInput
          id="background"
          :model-value="rgbToHex(backgroundColor)"
          @update:model-value="updateBackgroundColor"
        />
      </div>
      <div class="flex justify-between w-full items-center px-4 py-3 gap-4">
        <span class="text-muted-foreground">Brightness</span>
        <div class="w-55 max-w-55">
          <TheSlider
            :min="0"
            :max="100"
            :initial-value="backgroundBrightness"
            @change="updateBrightness"
          />
        </div>
      </div>
    </div>
  </div>
</template>
