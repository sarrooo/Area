import { PayloadAction } from '@reduxjs/toolkit'
import { Trirea, TrireaReactionInput, TrireaTriggerInput } from '@/types/Trirea'
import { UserState, emptyTrirea } from '@/redux/features/userSlice'

export const clearTrirea = (state: UserState) => {
  state.trirea = emptyTrirea
}

export const setTrirea = (
  state: UserState,
  action: PayloadAction<{ trirea: Trirea }>
) => {
  state.trirea = action.payload.trirea
}

export const setTrireaName = (
  state: UserState,
  action: PayloadAction<{ name: string }>
) => {
  state.trirea.name = action.payload.name
}

export const setTriggerId = (
  state: UserState,
  action: PayloadAction<{ id: number }>
) => {
  state.trirea.triggerId = action.payload.id
}

export const setReactionId = (
  state: UserState,
  action: PayloadAction<{ id: number }>
) => {
  state.trirea.reactionId = action.payload.id
}

export const addTriggerInput = (
  state: UserState,
  action: PayloadAction<{ triggerInput: TrireaTriggerInput }>
) => {
  state.trirea.triggerInputs.push(action.payload.triggerInput)
}

export const addReactionInput = (
  state: UserState,
  action: PayloadAction<{ triggerInput: TrireaReactionInput }>
) => {
  state.trirea.reactionInputs.push(action.payload.triggerInput)
}

export const clearTriggerInputs = (state: UserState) => {
  state.trirea.triggerInputs = []
}

export const clearReactionInputs = (state: UserState) => {
  state.trirea.reactionInputs = []
}

export const removeTriggerInput = (
  state: UserState,
  action: PayloadAction<{ triggerInputId: number }>
) => {
  state.trirea.triggerInputs.filter((trirea) => {
    return trirea.trireaId !== action.payload.triggerInputId
  })
}

export const removeReactionInput = (
  state: UserState,
  action: PayloadAction<{ reactionInputId: number }>
) => {
  state.trirea.reactionInputs.filter((trirea) => {
    return trirea.trireaId !== action.payload.reactionInputId
  })
}
