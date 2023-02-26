import { PayloadAction } from '@reduxjs/toolkit'
import { Trirea, TrireaReactionInput, TrireaTriggerInput } from '../../types/Trirea'
import { UserState, emptyTrirea } from '../features/userSlice'

export const fillTrireasReducer = (
  state: UserState,
  action: PayloadAction<Trirea[]>
) => {
  state.trireas = action.payload
}

export const clearTrireaReducer = (state: UserState) => {
  state.trirea = emptyTrirea
}

export const setTrireaReducer = (
  state: UserState,
  action: PayloadAction<{ trirea: Trirea }>
) => {
  state.trirea = action.payload.trirea
}

export const setTrireaNameReducer = (
  state: UserState,
  action: PayloadAction<{ name: string }>
) => {
  state.trirea.name = action.payload.name
}

export const setTriggerIdReducer = (
  state: UserState,
  action: PayloadAction<{ id: number }>
) => {
  state.trirea.triggerId = action.payload.id
}

export const setReactionIdReducer = (
  state: UserState,
  action: PayloadAction<{ id: number }>
) => {
  state.trirea.reactionId = action.payload.id
}

export const addTriggerInputReducer = (
  state: UserState,
  action: PayloadAction<{ triggerInput: TrireaTriggerInput }>
) => {
  state.trirea.triggerInputs.push(action.payload.triggerInput)
}

export const addReactionInputReducer = (
  state: UserState,
  action: PayloadAction<{ triggerInput: TrireaReactionInput }>
) => {
  state.trirea.reactionInputs.push(action.payload.triggerInput)
}

export const clearTriggerInputsReducer = (state: UserState) => {
  state.trirea.triggerInputs = []
}

export const clearReactionInputsReducer = (state: UserState) => {
  state.trirea.reactionInputs = []
}

export const removeTriggerInputReducer = (
  state: UserState,
  action: PayloadAction<{ triggerInputId: number }>
) => {
  state.trirea.triggerInputs.filter((trirea) => {
    return trirea.trireaId !== action.payload.triggerInputId
  })
}

export const removeReactionInputReducer = (
  state: UserState,
  action: PayloadAction<{ reactionInputId: number }>
) => {
  state.trirea.reactionInputs.filter((trirea) => {
    return trirea.trireaId !== action.payload.reactionInputId
  })
}
