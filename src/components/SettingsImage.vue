<script lang="ts" setup>
import ImageList from './ImageList.vue'

defineProps<{
  image: string
}>()
</script>

<template>
  <ImageList :selected="image" />
</template>
