<script setup lang="ts">
import packageJson from '@/../package.json'
import { patchState } from '@/api/state.patch'
import UiSlider from '@/components/ui/UiSlider.vue'
import UiToggle from '@/components/ui/UiToggle.vue'
import { useStore } from '@/store/store'
import { ChevronLeft, Sun, SunDim } from 'lucide-vue-next'

const version = packageJson.version

const store = useStore()

const updateEnabled = (enabled: boolean) => {
  patchState({ adaptiveBrightness: { enabled } }).then(() => {
    store.state!.adaptiveBrightness.enabled = enabled
  })
}

const updateBrightness = (brightness: number) => {
  patchState({ adaptiveBrightness: { brightness } }).then(() => {
    store.state!.adaptiveBrightness.brightness = brightness
  })
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
        :class="{ 'max-h-25': store.state!.adaptiveBrightness.enabled }"
      >
        <label class="flex items-center justify-between" for="enabled">
          <span class="text-muted-foreground">Adaptive brightness</span>
          <UiToggle
            id="enabled"
            :model-value="store.state!.adaptiveBrightness.enabled!"
            @update:model-value="updateEnabled"
          />
        </label>
        <Transition name="slide-fade">
          <div
            v-if="store.state!.adaptiveBrightness.enabled"
            class="border-secondary flex shrink-0 grow flex-row items-center gap-3 border-t pt-3"
          >
            <SunDim class="text-muted-foreground shrink-0" />
            <UiSlider
              :model-value="store.state!.adaptiveBrightness.brightness!"
              @update:model-value="updateBrightness"
              :min="0"
              :max="100"
            />
            <Sun class="text-muted-foreground shrink-0" />
          </div>
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
