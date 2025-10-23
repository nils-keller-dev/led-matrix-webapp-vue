<script setup lang="ts">
import { patchState } from '@/api/state.patch'
import UiSlider from '@/components/ui/UiSlider.vue'
import { useStore } from '@/store/store'
import { Moon, Sun, SunDim } from 'lucide-vue-next'
import UiToggleButton from './ui/UiToggleButton.vue'
import UiDrawer from './ui/UiDrawer.vue'
import SettingsAdaptiveBrightness from './settings/SettingsAdaptiveBrightness.vue'
import { onMounted, ref, useTemplateRef } from 'vue'
import { usePreventBackNavigation } from '@/composables/usePreventBackNavigation'
import { handleTapAndHold } from '@/utils/handleTapAndHold'

const uiToggleButton = useTemplateRef('uiToggleButton')

const store = useStore()
const isDrawerOpen = ref(false)

const onChangeBrightness = (brightness: number) => {
  patchState({ global: { brightness } })
}

const onChangeEnabled = (enabled: boolean) => {
  patchState({ adaptiveBrightness: { enabled } }).then(() => {
    store.state!.adaptiveBrightness.enabled = enabled
  })
}

onMounted(() => {
  uiToggleButton.value &&
    handleTapAndHold(
      uiToggleButton.value.$el,
      () => (isDrawerOpen.value = true)
    )
})
</script>

<template>
  <div class="flex w-full gap-5 p-7">
    <div class="flex shrink-0 grow flex-row items-center gap-3">
      <SunDim class="text-muted-foreground shrink-0" />
      <UiSlider
        :model-value="store.state!.global.brightness!"
        @update:model-value="onChangeBrightness"
        :min="3"
        :max="100"
      />
      <Sun class="text-muted-foreground shrink-0" />
    </div>
    <UiToggleButton
      ref="uiToggleButton"
      :model-value="store.state!.adaptiveBrightness.enabled!"
      @update:model-value="onChangeEnabled"
      :icon="Moon"
    />
    <UiDrawer v-model:open="isDrawerOpen">
      <SettingsAdaptiveBrightness
        :brightness="store.state!.adaptiveBrightness.brightness!"
      />
    </UiDrawer>
  </div>
</template>
