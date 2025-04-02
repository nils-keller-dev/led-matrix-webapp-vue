import type { State } from '@/constants/interfaces/State'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
  const state = ref<State | null>(null)
  const images = ref<string[] | null>(null)

  return { state, images }
})
