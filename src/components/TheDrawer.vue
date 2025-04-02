<script lang="ts" setup>
import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTitle
} from 'vaul-vue'

const isOpen = defineModel<boolean>('open')
</script>

<template>
  <DrawerRoot v-model:open="isOpen">
    <DrawerPortal>
      <DrawerOverlay
        class="fixed inset-0 backdrop-blur-xs backdrop-brightness-50 z-10"
      />
      <DrawerContent
        :aria-describedby="undefined"
        class="bg-background flex flex-col gap-7 p-7 pt-4 fixed w-full bottom-0 rounded-t-xl border border-secondary border-b-0 max-h-[85vh] outline-hidden z-20"
      >
        <DrawerTitle class="hidden" />
        <div class="bg-secondary w-20 h-2 shrink-0 rounded-full mx-auto" />
        <slot />
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
