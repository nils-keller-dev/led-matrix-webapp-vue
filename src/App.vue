<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next'
import { ref } from 'vue'
import { getImages } from './api/images.get'
import { getState } from './api/state.get'
import { patchState } from './api/state.patch'
import TheCarousel from './components/TheCarousel.vue'
import TheHeader from './components/TheHeader.vue'
import { CAROUSEL_ITEMS } from './constants/CarouselItems'
import { Mode } from './constants/enums/Mode'
import { useStore } from './store/store'

const store = useStore()

const currentCarouselIndex = ref(-1)
const isDrawerOpen = ref(false)

const onClickCarouselSettings = () => {
  isDrawerOpen.value = true
}

const onChangeCarouselIndex = (index: number, initial?: boolean) => {
  currentCarouselIndex.value = index

  if (initial) return
  patchState({ global: { mode: Mode[CAROUSEL_ITEMS[index].id] } })
}

getState().then((newState) => {
  store.state = newState
})

getImages().then((newImages) => {
  store.images = newImages
})
</script>

<template>
  <div
    v-if="store.state && store.images"
    class="flex flex-col justify-between h-full"
  >
    <TheHeader />
    <div class="flex flex-col gap-10">
      <TheCarousel
        :slides="CAROUSEL_ITEMS"
        :initial-value="Mode[store.state?.global.mode as keyof typeof Mode]"
        @change="onChangeCarouselIndex"
        @click-settings="onClickCarouselSettings"
      />
    </div>
  </div>
  <div v-else class="flex items-center justify-center size-screen">
    <LoaderCircle class="size-5 animate-spin" />
  </div>
</template>
