import { MessageAction, MessageType } from '@/constants/enums/Message'
import { useWebsocket } from '@/store/websocket'

export const deleteImage = (image: string) => {
  useWebsocket().send(MessageType.Images, MessageAction.Delete, image)
}
