import { Mode } from '@/constants/enums/Mode'
import { CaseSensitive, Clock, Image, Moon, Music } from 'lucide-vue-next'

export const CAROUSEL_ITEMS = [
  {
    id: Mode.clock,
    icon: Clock,
    hasConfiguration: true
  },
  {
    id: Mode.music,
    icon: Music,
    hasConfiguration: true
  },
  {
    id: Mode.image,
    icon: Image,
    hasConfiguration: true
  },
  {
    id: Mode.text,
    icon: CaseSensitive,
    hasConfiguration: true
  },
  {
    id: Mode.idle,
    icon: Moon,
    hasConfiguration: false
  }
]
