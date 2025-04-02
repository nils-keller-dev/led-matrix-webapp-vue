<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'

const props = defineProps<{
  min: number
  max: number
}>()

const modelValue = defineModel<number>({ required: true })
const currentValue = ref(modelValue.value)
const sliderRef = useTemplateRef<HTMLSpanElement>('sliderRef')

const percent = computed(
  () => ((currentValue.value - props.min) / (props.max - props.min)) * 100
)
const dynamicOffset = computed(() => -20 * (percent.value / 100) + 10)

const handleDrag = (e: PointerEvent) => {
  if (!sliderRef.value) return

  const rect = sliderRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const newValue = Math.round(
    Math.min(
      props.max,
      Math.max(
        props.min,
        (x / rect.width) * (props.max - props.min) + props.min
      )
    )
  )

  currentValue.value = newValue
}

const startDrag = (event: PointerEvent) => {
  handleDrag(event)
  addEventListener('pointermove', handleDrag)
  addEventListener('pointerup', stopDrag)
}

const stopDrag = () => {
  removeEventListener('pointermove', handleDrag)
  removeEventListener('pointerup', stopDrag)

  if (currentValue.value !== modelValue.value) {
    modelValue.value = currentValue.value
  }
}
</script>

<template>
  <span
    ref="sliderRef"
    class="relative flex h-6 w-full touch-none items-center"
    @pointerdown.stop="startDrag"
  >
    <span class="bg-secondary relative h-2 w-full overflow-hidden rounded-full">
      <span class="bg-primary absolute h-full" :style="`width: ${percent}%`" />
    </span>
    <span
      :style="`left: calc(${percent}% + ${dynamicOffset}px)`"
      class="absolute -translate-x-1/2"
    >
      <span
        class="border-primary bg-background block h-5 w-5 rounded-full border-2"
      />
    </span>
  </span>
</template>
