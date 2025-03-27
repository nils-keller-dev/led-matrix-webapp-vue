<script setup lang="ts">
import packageJson from '../../package.json'

const version = packageJson.version
</script>

<template>
  <header
    class="border-b border-b-secondary flex items-center justify-between pr-4"
  >
    <div class="flex items-center text-muted-foreground gap-1">
      <img src="/logo.svg" alt="logo" class="size-14" />
      <span>led-matrix-webapp</span>
    </div>
    <a href="/api/state" class="text-secondary"> v{{ version }} </a>
  </header>
</template>
