import { api } from '@/redux/services/api'
import { TrireaResponse } from '@/types/Trirea'

export const trireaApi = api.injectEndpoints({
  endpoints: (build) => ({
    trirea: build.query<TrireaResponse, void>({
      query: (body) => ({
        url: `/trirea`,
        method: 'GET',
        body,
      }),
    }),
  }),
})

export const { useTrireaQuery } = trireaApi
