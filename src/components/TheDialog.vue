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
        class="backdrop-brightness-50 backdrop-blur-xs size-screen fixed top-0 z-30"
      />
      <DialogContent
        :aria-describedby="undefined"
        class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 bg-background p-4 rounded-xl outline-hidden z-40 border border-secondary"
        @pointer-down-outside.prevent
      >
        <DialogTitle class="hidden" />
        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
