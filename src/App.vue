<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next'
import { ref } from 'vue'
import { getImages } from './api/images.get'
import { getState } from './api/state.get'
import { patchState } from './api/state.patch'
import GlobalConfiguration from './components/GlobalConfiguration.vue'
import SettingsClock from './components/SettingsClock.vue'
import SettingsImage from './components/SettingsImage.vue'
import SettingsMusic from './components/SettingsMusic.vue'
import SettingsText from './components/SettingsText.vue'
import TheCarousel from './components/TheCarousel.vue'
import TheDrawer from './components/TheDrawer.vue'
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

const onChangeBrightness = (brightness: number) => {
  patchState({ global: { brightness } })
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
      <GlobalConfiguration
        :model-value="store.state.global.brightness!"
        @update:model-value="onChangeBrightness"
      />
    </div>
    <TheDrawer v-model:open="isDrawerOpen">
      <template v-if="currentCarouselIndex >= 0">
        <SettingsClock
          v-if="currentCarouselIndex === 0"
          :color="store.state.clock.color!"
          :background-color="store.state.clock.backgroundColor!"
          :background-brightness="store.state.clock.backgroundBrightness!"
        />
        <SettingsMusic
          v-else-if="currentCarouselIndex === 1"
          :fullscreen="store.state.music.fullscreen!"
        />
        <SettingsImage
          v-else-if="currentCarouselIndex === 2"
          :image="store.state.image.image!"
        />
        <SettingsText
          v-else-if="currentCarouselIndex === 3"
          :align="store.state.text.align!"
          :text="store.state.text.text!"
          :size="store.state.text.size!"
          :speed="store.state.text.speed!"
          :color="store.state.text.color!"
        />
      </template>
    </TheDrawer>
  </div>
  <div v-else class="flex items-center justify-center size-screen">
    <LoaderCircle class="size-5 animate-spin" />
  </div>
</template>
