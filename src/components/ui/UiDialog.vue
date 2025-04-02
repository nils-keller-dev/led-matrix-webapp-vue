<script lang="ts" setup>
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle
} from 'reka-ui'

const isOpen = defineModel<boolean>('open')
</script>

<template>
  <DialogRoot v-model:open="isOpen">
    <DialogPortal>
      <DialogOverlay
        class="size-screen fixed top-0 z-30 backdrop-blur-xs backdrop-brightness-50"
      />
      <DialogContent
        :aria-describedby="undefined"
        class="bg-background border-secondary fixed top-1/2 left-1/2 z-40 w-10/12 -translate-x-1/2 -translate-y-1/2 rounded-xl border p-4 outline-hidden"
        @pointer-down-outside.prevent
      >
        <DialogTitle class="hidden" />
        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
