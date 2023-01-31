import { api } from '@/redux/services/api'
import { Trigger, TriggerInputType, TriggerOutputType } from '@/types/Trigger'

export const triggerApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTriggers: build.query<Trigger[], void>({
      query: () => ({
        url: `/trigger`,
        method: 'GET',
      }),
    }),
    getTrigger: build.query<Trigger, void>({
      query: () => ({
        url: `/trigger/:id`,
        method: 'GET',
      }),
    }),
    createTrigger: build.mutation<void, Trigger>({
      query: (body) => ({
        url: `/trigger`,
        method: 'POST',
        body,
      }),
    }),
    updateTrigger: build.mutation<void, Trigger>({
      query: (body) => ({
        url: `/trigger/delete/:id`,
        method: 'POST',
        body,
      }),
    }),
    deleteTrigger: build.mutation<void, void>({
      query: () => ({
        url: `/trigger/:id`,
        method: 'POST',
      }),
    }),

    getTriggerOutputs: build.query<TriggerOutputType[], void>({
      query: () => ({
        url: `/output/trigger`,
        method: 'GET',
      }),
    }),
    getTriggerOutput: build.query<TriggerOutputType, void>({
      query: () => ({
        url: `/output/trigger/:id`,
        method: 'GET',
      }),
    }),
    createTriggerOutput: build.mutation<void, TriggerOutputType>({
      query: (body) => ({
        url: `/output/trigger`,
        method: 'POST',
        body,
      }),
    }),
    updateTriggerOutput: build.mutation<void, TriggerOutputType>({
      query: (body) => ({
        url: `/output/trigger/delete/:id`,
        method: 'POST',
        body,
      }),
    }),
    deleteTriggerOutput: build.mutation<void, void>({
      query: () => ({
        url: `/output/trigger/:id`,
        method: 'POST',
      }),
    }),

    getTriggerInputs: build.query<TriggerInputType[], void>({
      query: () => ({
        url: `/input/trigger`,
        method: 'GET',
      }),
    }),
    getTriggerInput: build.query<TriggerInputType, void>({
      query: () => ({
        url: `/input/trigger`,
        method: 'GET',
      }),
    }),
    createTriggerInput: build.mutation<void, TriggerInputType>({
      query: (body) => ({
        url: `/input/trigger/:id`,
        method: 'POST',
        body,
      }),
    }),
    updateTriggerInput: build.mutation<void, TriggerInputType>({
      query: (body) => ({
        url: `/input/trigger/delete/:id`,
        method: 'POST',
        body,
      }),
    }),
    deleteTriggerInput: build.mutation<void, void>({
      query: () => ({
        url: `/input/trigger/:id`,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGetTriggersQuery,
  useGetTriggerQuery,
  useCreateTriggerMutation,
  useUpdateTriggerMutation,
  useDeleteTriggerMutation,
  useGetTriggerOutputsQuery,
  useGetTriggerOutputQuery,
  useCreateTriggerOutputMutation,
  useUpdateTriggerOutputMutation,
  useDeleteTriggerOutputMutation,
  useGetTriggerInputsQuery,
  useGetTriggerInputQuery,
  useCreateTriggerInputMutation,
  useUpdateTriggerInputMutation,
  useDeleteTriggerInputMutation,
} = triggerApi
