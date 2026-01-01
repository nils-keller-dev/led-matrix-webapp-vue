import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWebsocket = defineStore('websocket', () => {
  const websocket = ref(new WebSocket('/ws/'))

  websocket.value.addEventListener('open', () => {
    console.log('CONNECTED')
    setInterval(() => {
      console.log('SENT: ping')
      websocket.value.send('ping')
    }, 1000)
  })

  return {
    websocket
  }
})
