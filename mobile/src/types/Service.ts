import {Trigger} from '../types/Trigger'
import {Reaction} from '../types/Reaction'

export type Service = {
  id?: number
  name: string
  description?: string
  image?: string
  triggers?: Trigger[]
  reactions?: Reaction[]
  requiredSubscription: boolean
  subscribed?: boolean
}
