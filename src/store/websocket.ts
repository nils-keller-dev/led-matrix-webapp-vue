import { MessageAction, MessageType } from '@/constants/enums/Message'
import type {
  RequestMessage,
  ResponseMessage
} from '@/constants/interfaces/Websocket'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useStore } from './store'
import { patchState } from '@/api/state.patch'

export const useWebsocket = defineStore('websocket', () => {
  const websocket = ref(new WebSocket('/ws/'))
  const isConnected = ref(false)

  const store = useStore()

  websocket.value.addEventListener('open', () => {
    isConnected.value = true
    send(MessageType.State, MessageAction.Get)
    send(MessageType.Images, MessageAction.Get)
  })

  websocket.value.addEventListener('message', (event: MessageEvent) => {
    const message: ResponseMessage = JSON.parse(event.data)

    switch (message.type) {
      case MessageType.State:
        //TODO: deep merge instead of assigning?
        store.state = message.body
        break
      case MessageType.Images:
        store.images = message.body

        const selectedImage = store.state?.image.image
        if (selectedImage && !store.images.includes(selectedImage)) {
          patchState({ image: { image: store.images[0] } })
        }

        break
    }
  })

  const send = (
    type: MessageType,
    action: MessageAction,
    body?: RequestMessage['body']
  ) => {
    if (!isConnected.value) return

    websocket.value.send(
      JSON.stringify({
        type,
        action,
        body
      })
    )
  }

  return {
    isConnected,
    send
  }
})
