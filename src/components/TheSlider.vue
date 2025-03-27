<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'

const props = withDefaults(
  defineProps<{
    min: number
    max: number
    initialValue?: number
  }>(),
  {
    initialValue: 0
  }
)

const emit = defineEmits<{
  change: [value: number]
}>()

const value = ref(props.initialValue)
const sliderRef = useTemplateRef<HTMLSpanElement>('sliderRef')
const lastReportedValue = ref(props.initialValue)

const percent = computed(
  () => ((value.value - props.min) / (props.max - props.min)) * 100
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

  value.value = newValue
}

const startDrag = (event: PointerEvent) => {
  handleDrag(event)
  addEventListener('pointermove', handleDrag)
  addEventListener('pointerup', stopDrag)
}

const stopDrag = () => {
  removeEventListener('pointermove', handleDrag)
  removeEventListener('pointerup', stopDrag)

  if (value.value !== lastReportedValue.value) {
    emit('change', value.value)
    lastReportedValue.value = value.value
  }
}
</script>

<template>
  <span
    ref="sliderRef"
    class="relative flex items-center w-full touch-none h-6"
    @pointerdown="startDrag"
  >
    <span class="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
      <span class="absolute h-full bg-primary" :style="`width: ${percent}%`" />
    </span>
    <span
      :style="`left: calc(${percent}% + ${dynamicOffset}px)`"
      class="absolute -translate-x-1/2"
    >
      <span
        class="block h-5 w-5 rounded-full border-2 border-primary bg-background"
      />
    </span>
  </span>
</template>
