import { api } from '@/redux/services/api'
import { Reaction, ReactionInputType } from '@/types/Reaction'

export const reactionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getReactions: build.query<Reaction[], void>({
      query: () => ({
        url: `/reaction`,
        method: 'GET',
      }),
    }),
    getReaction: build.query<Reaction, number>({
      query: (id) => ({
        url: `/reaction/${id}`,
        method: 'GET',
      }),
    }),
    createReaction: build.mutation<void, Reaction>({
      query: (body) => ({
        url: `/reaction`,
        method: 'POST',
        body,
      }),
    }),
    updateReaction: build.mutation<void, Reaction>({
      query: (body) => ({
        url: `/reaction/delete/${body.id ? body.id : ''}`,
        method: 'POST',
        body,
      }),
    }),
    deleteReaction: build.mutation<void, number>({
      query: (id) => ({
        url: `/reaction/${id}`,
        method: 'POST',
      }),
    }),

    getReactionInputs: build.query<ReactionInputType[], void>({
      query: () => ({
        url: `/input/reaction`,
        method: 'GET',
      }),
    }),
    getReactionInput: build.query<ReactionInputType, number>({
      query: (id) => ({
        url: `/input/reaction/${id}`,
        method: 'GET',
      }),
    }),
    createReactionInput: build.mutation<void, ReactionInputType>({
      query: (body) => ({
        url: `/input/reaction`,
        method: 'POST',
        body,
      }),
    }),
    updateReactionInput: build.mutation<void, ReactionInputType>({
      query: (body) => ({
        url: `/input/reaction/delete/${body.id ? body.id : ''}`,
        method: 'POST',
        body,
      }),
    }),
    deleteReactionInput: build.mutation<void, number>({
      query: (id) => ({
        url: `/input/reaction/${id}`,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGetReactionsQuery,
  useGetReactionQuery,
  useCreateReactionMutation,
  useUpdateReactionMutation,
  useDeleteReactionMutation,
  useGetReactionInputsQuery,
  useGetReactionInputQuery,
  useCreateReactionInputMutation,
  useUpdateReactionInputMutation,
  useDeleteReactionInputMutation,
} = reactionApi
