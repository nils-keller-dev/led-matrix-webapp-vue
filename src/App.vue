<script setup lang="ts">
import { ref } from 'vue'
import { patchState } from './api/state.patch'
import TheCarousel from './components/TheCarousel.vue'
import TheHeader from './components/TheHeader.vue'
import { CAROUSEL_ITEMS } from './constants/CarouselItems'
import { Mode } from './constants/enums/Mode'

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
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <TheHeader />
    <div class="flex flex-col gap-10">
      <TheCarousel
        :slides="CAROUSEL_ITEMS"
        :initial-value="0"
        @change="onChangeCarouselIndex"
        @click-settings="onClickCarouselSettings"
      />
    </div>
  </div>
</template>
