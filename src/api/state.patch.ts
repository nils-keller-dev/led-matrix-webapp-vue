import { MessageAction, MessageType } from '@/constants/enums/Message'
import type { State } from '@/constants/interfaces/State'
import { useWebsocket } from '@/store/websocket'

export const patchState = (state: Partial<State>) => {
  useWebsocket().send(MessageType.State, MessageAction.Patch, state)
}
