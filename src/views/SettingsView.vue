<script setup lang="ts">
import packageJson from '@/../package.json'

const version = packageJson.version
</script>

<template>
  <p>
    Settings View
    <a href="/api/state" class="text-secondary"> v{{ version }} </a>
  </p>
  <RouterLink to="/">go back</RouterLink>
</template>
