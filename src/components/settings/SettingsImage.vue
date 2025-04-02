<script lang="ts" setup>
import ImageList from '@/components/image/ImageList.vue'

defineProps<{
  image: string
}>()
</script>

<template>
  <ImageList :selected="image" />
</template>
