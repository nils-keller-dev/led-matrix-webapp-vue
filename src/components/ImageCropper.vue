<script lang="ts" setup>
import { LoaderCircle } from 'lucide-vue-next'
import { ref, useTemplateRef } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { downscaleCanvas } from '../utils/downscaleCanvas'
import TheButton from './TheButton.vue'

type DefaultSize = {
  imageSize: {
    width: number
    height: number
  }
}

defineProps<{
  src: string
}>()

const emit = defineEmits<{
  confirm: [file: File]
  cancel: []
}>()

const cropper = useTemplateRef('cropper')
const isCropperReady = ref(false)

const defaultSize = ({ imageSize: { width, height } }: DefaultSize) => ({
  width: Math.max(width, height),
  height: Math.max(width, height)
})

const onCropperReady = () => {
  isCropperReady.value = true
}

const onConfirm = () => {
  const result = cropper.value?.getResult()

  if (!result?.canvas) return

  downscaleCanvas(result.canvas)
    .then((file) => {
      emit('confirm', file)
    })
    .catch(console.error)
}
</script>

<template>
  <div>
    <div class="aspect-square bg-background w-full relative">
      <LoaderCircle
        v-if="!isCropperReady"
        class="size-5 animate-spin absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Cropper
        :key="src"
        ref="cropper"
        image-restriction="none"
        :default-size
        :src
        :stencil-props="{
          aspectRatio: 1
        }"
        class="size-full"
        :move-image="false"
        :resize-image="false"
        @ready="onCropperReady"
      />
    </div>
    <div class="flex justify-between mt-4">
      <TheButton text="Cancel" is-secondary @click="$emit('cancel')" />
      <TheButton text="Confirm" @click="onConfirm" />
    </div>
  </div>
</template>
