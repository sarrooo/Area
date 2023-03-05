export type TriggerInputType = {
  id: number
  name: string
  type: string
  description?: string
  regex?: string
  mandatory: boolean
  triggerId: number
}

export type TriggerOutput = {
  id: number | undefined
  triggerId: number
  name: string
  description: string | undefined
  type: string
  value: string | number | boolean | undefined
}

export type TriggerOutputType = {
  id: number
  name: string
  type: string
  description?: string
  triggerId: number
}

export type Trigger = {
  id?: number
  name: string
  description?: string
  inputs?: TriggerInputType[]
  outputs?: TriggerOutputType[]
  serviceId: number
}
