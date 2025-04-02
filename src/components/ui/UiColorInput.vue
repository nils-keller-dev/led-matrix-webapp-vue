<script lang="ts" setup>
import UiSkeleton from '@/components/ui/UiSkeleton.vue'
import { fetchColorName } from '@/utils/fetchColorName'
import debounceFunction from 'debounce-fn'
import { ref, useTemplateRef, watchEffect } from 'vue'

defineProps<{
  id: string
}>()

const UiColorInput = useTemplateRef<HTMLInputElement>('UiColorInput')

const colorValue = defineModel<string>({ required: true })
const displayColor = ref(colorValue.value)
const colorName = ref('')

const onColorChange = () => {
  const color = UiColorInput.value?.value ?? ''
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
  <div class="flex items-center gap-3">
    <input
      :id
      ref="UiColorInput"
      aria-label="color picker"
      type="color"
      :value="colorValue"
      class="absolute size-0 opacity-0"
      @change="onColorChange"
    />
    <UiSkeleton v-if="!colorName" class="h-5 w-25" />
    <span v-else class="text-primary">{{ colorName }}</span>
    <div
      class="border-secondary size-6 rounded-md border"
      :style="`background-color: ${displayColor}`"
    />
  </div>
</template>
