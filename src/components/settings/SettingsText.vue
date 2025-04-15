<script lang="ts" setup>
import { patchState } from '@/api/state.patch'
import UiColorInput from '@/components/ui/UiColorInput.vue'
import UiRadioGroup from '@/components/ui/UiRadioGroup.vue'
import UiSlider from '@/components/ui/UiSlider.vue'
import UiTextArea from '@/components/ui/UiTextArea.vue'
import UiWrapper from '@/components/ui/UiWrapper.vue'
import { TextAlign } from '@/constants/enums/TextAlign'
import { useStore } from '@/store/store'
import { hexToRgb, rgbToHex } from '@/utils/ColorConversion'
import { AlignCenter, AlignLeft } from 'lucide-vue-next'

defineProps<{
  align: TextAlign
  text: string
  size: number
  speed: number
  color: number[]
}>()

const store = useStore()

const updateAlign = (align: string) => {
  const alignValue = TextAlign[align as keyof typeof TextAlign]
  patchState({ text: { align: alignValue } }).then(() => {
    store.state!.text.align = alignValue
  })
}

const updateText = (text: string) => {
  patchState({ text: { text } }).then(() => {
    store.state!.text.text = text
  })
}

const updateSpeed = (speed: number) => {
  patchState({ text: { speed } }).then(() => {
    store.state!.text.speed = speed
  })
}

const updateSize = (size: number) => {
  patchState({ text: { size } }).then(() => {
    store.state!.text.size = size
  })
}

const updateColor = (color: string) => {
  const rgbColor = hexToRgb(color)
  patchState({ text: { color: rgbColor } }).then(() => {
    store.state!.text.color = rgbColor
  })
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="flex justify-center">
      <UiRadioGroup
        :icons="[AlignLeft, AlignCenter]"
        :values="Object.values(TextAlign)"
        :model-value="align"
        @update:model-value="updateAlign"
      />
    </div>
    <UiTextArea
      placeholder="Enter your text here"
      :model-value="text"
      @update:model-value="updateText"
    />
    <UiWrapper title="Size">
      <div class="w-55">
        <UiSlider
          :min="1"
          :max="5"
          :model-value="size"
          @update:model-value="updateSize"
        />
      </div>
    </UiWrapper>
    <UiWrapper title="Speed">
      <div class="w-55">
        <UiSlider
          :min="0"
          :max="10"
          :model-value="speed"
          @update:model-value="updateSpeed"
        />
      </div>
    </UiWrapper>
    <UiWrapper title="Color" html-for="color">
      <UiColorInput
        id="color"
        :model-value="rgbToHex(color)"
        @update:model-value="updateColor"
      />
    </UiWrapper>
  </div>
</template>
