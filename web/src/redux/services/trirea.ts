import { api } from '@/redux/services/api'
import { Trirea } from '@/types/Trirea'

export const trireaApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTrireas: build.query<Trirea[], void>({
      query: () => ({
        url: `/trirea`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Trirea' as const, id })),
              'Trirea',
            ]
          : ['Trirea'],
    }),
    getTrirea: build.query<Trirea, number>({
      query: (id: number) => ({
        url: `/trirea/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Trirea', id: arg }],
    }),
    createTrirea: build.mutation<void, Trirea>({
      query: (body) => ({
        url: `/trirea/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Trirea'],
    }),
    updateTrirea: build.mutation<void, Trirea>({
      query: (body) => ({
        url: `/trirea/${body.id ? body.id : ''}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Trirea', id: arg.id }],
    }),
    deleteTrirea: build.mutation<void, number>({
      query: (id) => ({
        url: `/trirea/delete/${id}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Trirea', id: arg }],
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
