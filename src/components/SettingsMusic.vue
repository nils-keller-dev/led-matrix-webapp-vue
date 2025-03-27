<script lang="ts" setup>
import { patchState } from '../api/state.patch'
import { useStore } from '../store/store'
import InputWrapper from './InputWrapper.vue'
import ToggleSwitch from './ToggleSwitch.vue'

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
  <InputWrapper title="Fullscreen" html-for="fullscreen">
    <ToggleSwitch
      id="fullscreen"
      :model-value="fullscreen"
      @update:model-value="updateFullscreen"
    />
  </InputWrapper>
</template>
