export type ReactionInputType = {
  id: number
  name: string
  type: string
  description?: string
  regex?: string
  mandatory: boolean
  reactionId: number
}

export type Reaction = {
  id?: number
  name: string
  description?: string
  inputs?: ReactionInputType[]
  serviceId: number
}
