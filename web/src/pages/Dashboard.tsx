import { TrireaCard } from '@/components/TrireaCard'
import { CreateTrireaButton } from '@/components/CreateTrireaButton'
import {
  useGetTrireasQuery,
  useCreateTrireaMutation,
} from '@/redux/services/trirea'
import {
  useCreateServiceMutation,
  useGetServicesQuery,
} from '@/redux/services/service'
import { useCreateTriggerMutation } from '@/redux/services/trigger'
import { useCreateReactionMutation } from '@/redux/services/reaction'

const dummyService = {
  name: 'Service',
  requiredSubscription: 'false',
}

const dummyTrigger = {
  name: 'Trigger',
  serviceId: 1,
}

const dummyReaction = {
  name: 'Reaction',
  serviceId: 1,
}

const dummyTrirea = {
  name: 'Trirea',
  enabled: true,
  triggerId: 1,
  triggerInputs: [],
  reactionId: 1,
  reactionInputs: [],
}

const trireas = [
  {
    name: 'test',
    triggerName: 'get email',
    reactionName: 'send email',
    isActive: true,
  },
]

export const Dashboard = () => {
  const { data, error, isError, isLoading } = useGetTrireasQuery()
  const {
    data: serviceData,
    error: serviceError,
    isError: serviceIsError,
    isLoading: serviceIsLoading,
  } = useGetServicesQuery()
  const [createServiceMutation] = useCreateServiceMutation()
  const [createTriggerMutation] = useCreateTriggerMutation()
  const [createReactionMutation] = useCreateReactionMutation()
  const [createTrireaMutation] = useCreateTrireaMutation()

  const createService = () => {
    createServiceMutation(dummyService)
  }

  return (
    <div className="px-32 py-16 space-y-16">
      <h1 className="font-bold text-4xl">Dashboard</h1>

      <button type="button" onClick={createService}>
        Create service
      </button>
      {isLoading && <p>Loading...</p>}
      {isError && <p> {JSON.stringify(error)} </p>}
      {!isError && !isLoading && <p> {JSON.stringify(data)} </p>}

      {serviceIsLoading && <p>Loading...</p>}
      {serviceIsError && <p> {JSON.stringify(serviceError)} </p>}
      {!serviceIsError && !serviceIsLoading && (
        <p> {JSON.stringify(serviceData)} </p>
      )}

      <div className="grid grid-cols-4 gap-y-8 gap-x-8">
        {trireas.map((trirea) => {
          return (
            <TrireaCard
              name={trirea.name}
              triggerName={trirea.triggerName}
              reactionName={trirea.reactionName}
              isActive={trirea.isActive}
            />
          )
        })}
        <CreateTrireaButton />
      </div>
    </div>
  )
}
