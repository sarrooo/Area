import { api } from '@/redux/services/api'
import { Service } from '@/types/Service'

export const serviceApi = api.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query<Service[], void>({
      query: () => ({
        url: `/service`,
        method: 'GET',
      }),
    }),
    getService: build.query<Service, number>({
      query: (id) => ({
        url: `/service/${id}`,
        method: 'GET',
      }),
    }),
    createService: build.mutation<void, Service>({
      query: (body) => ({
        url: `/service`,
        method: 'POST',
        body,
      }),
    }),
    updateService: build.mutation<void, Service>({
      query: (body) => ({
        url: `/service/${body.id ? body.id : ''}`,
        method: 'POST',
        body,
      }),
    }),
    deleteService: build.mutation<void, number>({
      query: (id) => ({
        url: `/service/delete/${id}}`,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGetServicesQuery,
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi
