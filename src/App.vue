<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next'
import { ref } from 'vue'
import { getImages } from './api/images.get'
import { getState } from './api/state.get'
import { patchState } from './api/state.patch'
import TheFooter from './components/TheFooter.vue'
import TheHeader from './components/TheHeader.vue'
import SettingsClock from './components/settings/SettingsClock.vue'
import SettingsImage from './components/settings/SettingsImage.vue'
import SettingsMusic from './components/settings/SettingsMusic.vue'
import SettingsText from './components/settings/SettingsText.vue'
import UiCarousel from './components/ui/UiCarousel.vue'
import UiDrawer from './components/ui/UiDrawer.vue'
import { usePreventBackNavigation } from './composables/usePreventBackNavigation'
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

usePreventBackNavigation(() => {
  isDrawerOpen.value = false
})
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <TheHeader />
    <template v-if="store.state && store.images">
      <div class="flex flex-col gap-10">
        <UiCarousel
          :slides="CAROUSEL_ITEMS"
          :initial-value="Mode[store.state?.global.mode as keyof typeof Mode]"
          @change="onChangeCarouselIndex"
          @click-settings="onClickCarouselSettings"
        />
        <TheFooter
          :model-value="store.state.global.brightness!"
          @update:model-value="onChangeBrightness"
        />
      </div>
      <UiDrawer v-model:open="isDrawerOpen">
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
      </UiDrawer>
    </template>
    <div v-else class="flex items-center justify-center size-screen">
      <LoaderCircle class="size-5 animate-spin" />
    </div>
  </div>
</template>
