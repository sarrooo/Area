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
    getService: build.query<Service, void>({
      query: () => ({
        url: `/service/:id`,
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
        url: `/service/:id`,
        method: 'POST',
        body,
      }),
    }),
    deleteService: build.mutation<void, void>({
      query: () => ({
        url: `/service/delete/:id`,
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
