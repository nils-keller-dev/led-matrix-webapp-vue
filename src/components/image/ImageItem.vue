<script lang="ts" setup>
import { ImageOff, LoaderCircle } from 'lucide-vue-next'
import { onMounted, ref, useTemplateRef } from 'vue'
import { handleTapAndHold } from '../../utils/handleTapAndHold'

const props = defineProps<{
  image: string
  isSelected: boolean
}>()

const emit = defineEmits<{
  delete: [value: string]
  select: [value: string]
}>()

const isLoading = ref(true)
const isError = ref(false)
const el = useTemplateRef<HTMLDivElement>('el')

onMounted(() => {
  if (el.value) {
    handleTapAndHold(el.value, () => {
      if (window.confirm('Are you sure you want to delete this image?')) {
        emit('delete', props.image)
      }
    })
  }
})

const onLoad = () => {
  isLoading.value = false
}

const onError = () => {
  isLoading.value = false
  isError.value = true
}
</script>

<template>
  <div
    ref="el"
    class="relative aspect-square w-full overflow-hidden rounded-xl outline"
    :class="
      isSelected
        ? 'outline-primary outline-2 -outline-offset-2'
        : 'outline-secondary outline-1 -outline-offset-1'
    "
    style="-webkit-touch-callout: none"
    @click="emit('select', image)"
    @contextmenu.prevent
  >
    <div v-if="isLoading" class="flex size-full items-center justify-center">
      <LoaderCircle class="size-5 animate-spin" />
    </div>
    <div v-if="isError" class="flex size-full items-center justify-center">
      <ImageOff class="text-muted-foreground size-5" />
    </div>
    <img
      :alt="image"
      :src="`api/image/${image}`"
      class="size-full object-contain"
      :class="isLoading ? 'opacity-0' : 'opacity-100'"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>
