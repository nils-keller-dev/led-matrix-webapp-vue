<script setup lang="ts">
import { Settings } from 'lucide-vue-next'
</script>

<template>
  <header
    class="border-b-secondary flex items-center justify-between border-b pr-4"
  >
    <div class="text-muted-foreground flex items-center gap-1">
      <img src="/logo.svg" alt="logo" class="size-14" />
      <span>led-matrix-webapp</span>
    </div>
    <RouterLink to="/settings">
      <Settings />
    </RouterLink>
  </header>
</template>
