<script lang="ts" setup>
import debounceFunction from 'debounce-fn'
import { ref, useTemplateRef, watchEffect } from 'vue'
import { fetchColorName } from '../utils/fetchColorName'
import TheSkeleton from './TheSkeleton.vue'

defineProps<{
  id: string
}>()

const colorInput = useTemplateRef<HTMLInputElement>('colorInput')

const colorValue = defineModel<string>({ required: true })
const displayColor = ref(colorValue.value)
const colorName = ref('')

const onColorChange = () => {
  const color = colorInput.value?.value ?? ''
  if (!color || color === colorValue.value) return

  displayColor.value = color
  colorName.value = ''
  debouncedOnChange(color)
}

const debouncedOnChange = debounceFunction(
  (color: string) => {
    colorValue.value = color
  },
  { wait: 500 }
)

watchEffect(() => {
  fetchColorName(colorValue.value).then((name) => (colorName.value = name))
})
</script>

<template>
  <div class="flex gap-3 items-center">
    <input
      :id
      ref="colorInput"
      aria-label="color picker"
      type="color"
      :value="colorValue"
      class="opacity-0 size-0 absolute"
      @change="onColorChange"
    />
    <TheSkeleton v-if="!colorName" class="w-25 h-5" />
    <span v-else class="text-primary">{{ colorName }}</span>
    <div
      class="size-6 rounded-md border border-secondary"
      :style="`background-color: ${displayColor}`"
    />
  </div>
</template>
