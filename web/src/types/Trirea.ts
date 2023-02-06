export type TrireaTriggerInput = {
  id?: number
  value?: string
  trireaId: number
  triggerInputTypeId: number
}

export type TrireaReactionInput = {
  id?: number
  value?: string
  trireaId: number
  triggerOutputTypeId?: number
  reactionInputTypeId: number
}

export type TrireaFormRequest = {
  name: string
  triggerId: number
  reactionId: number
  enabled: boolean
  triggerInputs: TrireaTriggerInput[]
  reactionInputs: TrireaReactionInput[]
  triggerInput1?: string
  triggerInput2?: string
  triggerInput3?: string
  reactionInput1?: string
  reactionInput2?: string
  reactionInput3?: string
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
