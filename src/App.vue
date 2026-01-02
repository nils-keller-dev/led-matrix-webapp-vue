<script setup lang="ts">
import { useStore } from '@/store/store'
import { LoaderCircle } from 'lucide-vue-next'
import { useWebsocket } from './store/websocket'
import { storeToRefs } from 'pinia'

const { state, images } = storeToRefs(useStore())
useWebsocket()
</script>

<template>
  <RouterView v-if="state && images" />
  <div v-else class="size-screen flex items-center justify-center">
    <LoaderCircle class="size-5 animate-spin" />
  </div>
</template>
