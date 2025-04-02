<script lang="ts" setup>
import { patchState } from '@/api/state.patch'
import UiToggle from '@/components/ui/UiToggle.vue'
import UiWrapper from '@/components/ui/UiWrapper.vue'
import { useStore } from '@/store/store'

defineProps<{
  fullscreen: boolean
}>()

const store = useStore()

const updateFullscreen = (fullscreen: boolean) => {
  patchState({ music: { fullscreen } }).then(() => {
    store.state!.music.fullscreen = fullscreen
  })
}
</script>

<template>
  <UiWrapper title="Fullscreen" html-for="fullscreen">
    <UiToggle
      id="fullscreen"
      :model-value="fullscreen"
      @update:model-value="updateFullscreen"
    />
  </UiWrapper>
</template>
