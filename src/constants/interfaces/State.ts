import { TextAlign } from '@/constants/enums/TextAlign'

interface Global {
  mode?: string
  brightness?: Brightness
}

interface Brightness {
  current?: number
  day?: number
  night?: number
  adaptive?: boolean
}

interface Clock {
  color?: number[]
  backgroundColor?: number[]
  backgroundBrightness?: number
}

interface Music {
  fullscreen?: boolean
}

interface Image {
  image?: string
}

interface Text {
  align?: TextAlign
  text?: string
  size?: number
  speed?: number
  color?: number[]
}

export interface State {
  global: Global
  clock: Clock
  music: Music
  image: Image
  text: Text
}
