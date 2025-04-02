<script lang="ts" setup>
defineProps<{
  id?: string
}>()

const value = defineModel<boolean>({ required: true })
</script>

<template>
  <div>
    <label :for="id">
      <div
        class="h-6 w-11 rounded-full p-0.5 transition-colors"
        :class="value ? 'bg-primary' : 'bg-secondary'"
      >
        <div
          class="bg-background size-5 rounded-full transition-transform"
          :class="value ? 'translate-x-full' : 'translate-x-0'"
        />
      </div>
    </label>
    <input :id v-model="value" class="hidden" type="checkbox" />
  </div>
</template>
