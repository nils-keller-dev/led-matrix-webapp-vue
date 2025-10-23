<script lang="ts" setup>
import { usePreventBackNavigation } from '@/composables/usePreventBackNavigation'
import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTitle
} from 'vaul-vue'

const isOpen = defineModel<boolean>('open')

usePreventBackNavigation(() => (isOpen.value = false))
</script>

<template>
  <DrawerRoot v-model:open="isOpen">
    <DrawerPortal>
      <DrawerOverlay
        class="fixed inset-0 z-10 backdrop-blur-xs backdrop-brightness-50"
      />
      <DrawerContent
        :aria-describedby="undefined"
        class="bg-background border-secondary fixed bottom-0 z-20 flex max-h-[85vh] w-full flex-col gap-7 rounded-t-xl border border-b-0 p-7 pt-4 outline-hidden"
      >
        <DrawerTitle class="hidden" />
        <div class="bg-secondary mx-auto h-2 w-20 shrink-0 rounded-full" />
        <slot />
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
