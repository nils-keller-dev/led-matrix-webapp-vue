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
    class="w-full aspect-square rounded-xl overflow-hidden relative outline"
    :class="
      isSelected
        ? 'outline-2 outline-primary -outline-offset-2'
        : 'outline-1 outline-secondary -outline-offset-1'
    "
    style="-webkit-touch-callout: none"
    @click="emit('select', image)"
    @contextmenu.prevent
  >
    <div v-if="isLoading" class="size-full flex justify-center items-center">
      <LoaderCircle class="size-5 animate-spin" />
    </div>
    <div v-if="isError" class="size-full flex justify-center items-center">
      <ImageOff class="size-5 text-muted-foreground" />
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
