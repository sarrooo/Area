import {Trigger} from './Trigger'
import {Reaction} from './Reaction'

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
