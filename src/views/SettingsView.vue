<script setup lang="ts">
import packageJson from '@/../package.json'
import { patchState } from '@/api/state.patch'
import BrightnessSlider from '@/components/BrightnessSlider.vue'
import UiToggle from '@/components/ui/UiToggle.vue'
import { useStore } from '@/store/store'
import { ChevronLeft, CircleQuestionMark } from 'lucide-vue-next'

const version = packageJson.version

const store = useStore()

const updateAdaptive = (adaptive: boolean) => {
  patchState({ global: { brightness: { adaptive } } })
}

const updateNight = (night: number) => {
  patchState({ global: { brightness: { night } } })
}

const onClickTip = () => {
  window.alert(
    'Automatically set the brightness to the value below during night time (between sunset and sunrise).'
  )
}
</script>

<template>
  <div class="flex h-full flex-col">
    <header class="flex h-16 w-full shrink-0 items-center justify-center">
      Settings
      <RouterLink
        to="/"
        class="border-secondary text-muted-foreground active:bg-secondary absolute left-4 flex size-9 items-center justify-center rounded-full border"
      >
        <ChevronLeft />
      </RouterLink>
      <a href="/api/state" class="text-secondary absolute right-6">
        v{{ version }}
      </a>
    </header>
    <main class="grow overflow-y-auto p-4">
      <div
        class="border-secondary relative flex max-h-12.5 flex-col gap-3 overflow-hidden rounded-md border px-4 py-3 transition-all duration-200"
        :class="{ 'max-h-25': store.state!.global.brightness!.adaptive }"
      >
        <label class="flex items-center justify-between" for="adaptive">
          <span class="text-muted-foreground inline-flex items-center gap-2">
            Adaptive brightness
            <CircleQuestionMark class="size-4" @click.prevent="onClickTip" />
          </span>
          <UiToggle
            id="adaptive"
            :model-value="store.state!.global.brightness!.adaptive!"
            @update:model-value="updateAdaptive"
          />
        </label>
        <Transition name="slide-fade">
          <BrightnessSlider
            v-if="store.state!.global.brightness!.adaptive"
            class="border-secondary border-t pt-3"
            :model-value="store.state!.global.brightness!.night!"
            @update:model-value="updateNight"
          />
        </Transition>
      </div>
    </main>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}
</style>
