<script lang="ts" setup>
import { patchState } from '../../api/state.patch'
import { useStore } from '../../store/store'
import UiWrapper from '../ui/UiWrapper.vue'
import UiToggle from '../ui/UiToggle.vue'

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
