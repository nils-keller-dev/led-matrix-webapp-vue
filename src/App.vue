<script setup lang="ts">
import { getImages } from '@/api/images.get'
import { getState } from '@/api/state.get'
import { useStore } from '@/store/store'
import { LoaderCircle } from 'lucide-vue-next'
import { useWebsocket } from './store/websocket'

const store = useStore()
useWebsocket()

getState().then((newState) => {
  store.state = newState
})

getImages().then((newImages) => {
  store.images = newImages
})
</script>

<template>
  <RouterView v-if="store.state && store.images" />
  <div v-else class="size-screen flex items-center justify-center">
    <LoaderCircle class="size-5 animate-spin" />
  </div>
</template>
