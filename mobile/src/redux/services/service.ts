import {api} from './api'
import {Service} from '../../types/Service'

export const serviceApi = api.injectEndpoints({
  endpoints: build => ({
    getServices: build.query<Service[], void>({
      query: () => ({
        url: `/service`,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [
              ...result.map(({id}) => ({type: 'Service' as const, id})),
              'Service',
            ]
          : ['Service'],
    }),
    getService: build.query<Service, number>({
      query: id => ({
        url: `/service/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{type: 'Service', id: arg}],
    }),
    createService: build.mutation<void, Service>({
      query: body => ({
        url: `/service`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Service'],
    }),
    updateService: build.mutation<void, Service>({
      query: body => ({
        url: `/service/${body.id ? body.id : ''}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{type: 'Service', id: arg.id}],
    }),
    deleteService: build.mutation<void, number>({
      query: id => ({
        url: `/service/delete/${id}}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [{type: 'Service', id: arg}],
    }),
    subscribe: build.mutation<void, {serviceId: number; subscribed: boolean}>({
      query: params => ({
        url: `/subscription`,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: (result, error, arg) => [
        {type: 'Service', id: arg.serviceId},
      ],
    }),
  }),
})

export const {
  useGetServicesQuery,
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useSubscribeMutation,
} = serviceApi
