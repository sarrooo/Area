export type TrireaTriggerInput = {
  id?: number
  name: string
  type: string
  value: string
  triggerInputTypeId: number | null
  trireaId?: number
}

export type TrireaReactionInput = {
  id?: number
  name: string
  type: string
  value: string
  reactionInputTypeId: number
  triggerOutputTypeId?: number
  trireaId?: number
}

export type TrireaFormRequest = {
  name: string
  triggerId: number
  reactionId: number
  enabled: boolean
  triggerInputs: TrireaTriggerInput[]
  reactionInputs: TrireaReactionInput[]
}

export type Trirea = {
  name: string
  id?: number
  createdAt?: Date
  updatedAt?: Date
  prevTriggerData?: string
  enabled: boolean
  userId?: number
  triggerId: number
  reactionId: number
  triggerInputs: TrireaTriggerInput[]
  reactionInputs: TrireaReactionInput[]
}
