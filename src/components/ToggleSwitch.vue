<script lang="ts" setup>
const value = defineModel<boolean>({
  required: true
})

defineProps<{
  id?: string
}>()
</script>

<template>
  <div>
    <label :for="id">
      <div
        class="w-11 h-6 rounded-full p-0.5 transition-colors"
        :class="value ? 'bg-primary' : 'bg-secondary'"
      >
        <div
          class="size-5 bg-background rounded-full transition-transform"
          :class="value ? 'translate-x-full' : 'translate-x-0'"
        />
      </div>
    </label>
    <input :id v-model="value" class="hidden" type="checkbox" />
  </div>
</template>
