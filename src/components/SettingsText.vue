<script lang="ts" setup>
import { AlignCenter, AlignJustify, AlignLeft } from 'lucide-vue-next'
import { patchState } from '../api/state.patch'
import { TextAlign } from '../constants/enums/TextAlign'
import { useStore } from '../store/store'
import { hexToRgb, rgbToHex } from '../utils/ColorConversion'
import ColorInput from './ColorInput.vue'
import InputWrapper from './InputWrapper.vue'
import RadioGroup from './RadioGroup.vue'
import TextArea from './TextArea.vue'
import TheSlider from './TheSlider.vue'

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
      <RadioGroup
        :icons="[AlignLeft, AlignCenter, AlignJustify]"
        :values="Object.values(TextAlign)"
        :selected="align"
        @change="updateAlign"
      />
    </div>
    <TextArea
      placeholder="Enter your text here"
      :initial-value="text"
      @change="updateText"
    />
    <InputWrapper title="Size">
      <div class="w-55">
        <TheSlider
          :min="1"
          :max="5"
          :initial-value="size"
          @change="updateSize"
        />
      </div>
    </InputWrapper>
    <InputWrapper title="Speed">
      <div class="w-55">
        <TheSlider
          :min="0"
          :max="10"
          :initial-value="speed"
          @change="updateSpeed"
        />
      </div>
    </InputWrapper>
    <InputWrapper title="Color" html-for="color">
      <ColorInput
        id="color"
        :initial-value="rgbToHex(color)"
        @change="updateColor"
      />
    </InputWrapper>
  </div>
</template>
