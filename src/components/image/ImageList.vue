<script lang="ts" setup>
import { deleteImage } from '@/api/image.delete'
import { patchState } from '@/api/state.patch'
import ImageAdd from '@/components/image/ImageAdd.vue'
import ImageItem from '@/components/image/ImageItem.vue'
import { useStore } from '@/store/store'
import { ref } from 'vue'

const props = defineProps<{
  selected: string
}>()

const store = useStore()

const currentImage = ref<string | undefined>(props.selected)

const updateImage = (image: string) => {
  if (image === currentImage.value) return

  currentImage.value = image
  patchState({ image: { image } })
}
</script>

<template>
  <div class="overflow-y-scroll">
    <div class="grid grid-cols-3 gap-3">
      <ImageItem
        v-for="(imageName, index) in store.images"
        :key="index"
        :image="imageName"
        :is-selected="imageName === currentImage"
        @delete="deleteImage"
        @select="updateImage"
      />
      <ImageAdd />
    </div>
  </div>
</template>
