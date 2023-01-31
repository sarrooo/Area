export type TrireaTriggerInput = {
  id?: number
  value?: string
  trireaId: number
  triggerInputTypeId: number
}

export type TrireaReactionInput = {
  id?: number
  value?: string
  linkedToId?: number
  trireaId: number
  reactionInputTypeId: number
}

export type Trirea = {
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
