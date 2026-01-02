import type { MessageAction, MessageType } from '../enums/Message'
import type { State } from './State'

export type ResponseMessage =
  | {
      type: MessageType.State
      body: State
    }
  | {
      type: MessageType.Images
      body: string[]
    }

export type RequestMessage = {
  [K in MessageType]:
    | {
        type: K
        action: MessageAction.Get
        body: undefined
      }
    | {
        type: K
        action: Exclude<MessageAction, MessageAction.Get>
        body: K extends MessageType.State ? Partial<State> : string
      }
}[MessageType]
