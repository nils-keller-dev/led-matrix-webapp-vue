<script lang="ts" setup>
import { ref } from 'vue'
import { deleteImage } from '../api/image.delete'
import { patchState } from '../api/state.patch'
import { useStore } from '../store/store'
import ImageAdd from './ImageAdd.vue'
import ImageItem from './ImageItem.vue'

const props = defineProps<{
  selected: string
}>()

const store = useStore()

const currentImage = ref<string | undefined>(props.selected)

const onDeleteImage = (image: string) => {
  deleteImage(image).then(() => {
    store.images = store.images?.filter((i) => i !== image) || null

    if (image === currentImage.value) {
      const newImage = store.images?.[0]

      currentImage.value = newImage
      patchState({ image: { image: newImage } }).then(() => {
        store.state!.image.image = newImage
      })
    }
  })
}

const updateImage = (image: string) => {
  if (image === currentImage.value) return

  currentImage.value = image

  patchState({ image: { image } }).then(() => {
    store.state!.image.image = image
  })
}
</script>

<template>
  <div className="overflow-y-scroll">
    <div className="grid grid-cols-3 gap-3">
      <ImageItem
        v-for="(imageName, index) in store.images"
        :key="index"
        :image="imageName"
        :is-selected="imageName === currentImage"
        @delete="onDeleteImage"
        @select="updateImage"
      />
      <ImageAdd />
    </div>
  </div>
</template>
