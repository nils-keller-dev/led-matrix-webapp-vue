import type { MessageAction, MessageType } from '../enums/Message'
import type { State } from './State'

interface BaseMessage {
  type: MessageType
}

export interface ResponseMessage extends BaseMessage {
  body: Partial<State> | string[]
}

export interface RequestMessage extends BaseMessage {
  action: MessageAction
  body?: Partial<State> | string
}
