import { MessageAction, MessageType } from '@/constants/enums/Message'
import { useWebsocket } from '@/store/websocket'
import { fetchWithCheck } from '@/utils/fetchWithCheck'

export const postImage = (image: File) => {
  const data = new FormData()
  data.append('image', image)

  return fetchWithCheck('/image', {
    method: 'POST',
    body: data
  }).then(() =>
    useWebsocket().send(MessageType.Images, MessageAction.Post, image.name)
  )
}
