import { api } from '@/redux/services/api'
import { Trirea } from '@/types/Trirea'

export const trireaApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTrireas: build.query<Trirea[], void>({
      query: () => ({
        url: `/trirea`,
        method: 'GET',
      }),
    }),
    getTrirea: build.query<Trirea, number>({
      query: (id: number) => ({
        url: `/trirea/${id}`,
        method: 'GET',
      }),
    }),
    createTrirea: build.mutation<void, Trirea>({
      query: (body) => ({
        url: `/trirea/`,
        method: 'POST',
        body,
      }),
    }),
    updateTrirea: build.mutation<void, Trirea>({
      query: (body) => ({
        url: `/trirea/${body.id ? body.id : ''}`,
        method: 'POST',
        body,
      }),
    }),
    deleteTrirea: build.mutation<void, number>({
      query: (id) => ({
        url: `/trirea/delete/${id}`,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGetTrireasQuery,
  useGetTrireaQuery,
  useCreateTrireaMutation,
  useUpdateTrireaMutation,
  useDeleteTrireaMutation,
} = trireaApi
