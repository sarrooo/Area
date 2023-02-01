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
  requiredSubscription: false,
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
  triggerId: 6,
  triggerInputs: [],
  reactionId: 1,
  reactionInputs: [],
}

const trireas = [
  {
    id: 1,
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
  const createTrigger = () => {
    createTriggerMutation(dummyTrigger)
  }
  const createReaction = () => {
    createReactionMutation(dummyReaction)
  }
  const createTrirea = () => {
    createTrireaMutation(dummyTrirea)
  }

  console.log('data -> ', data)
  console.log('serviceData -> ', serviceData)
  return (
    <div className="px-32 py-16 space-y-16">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      {/* <div className="flex space-x-8">
        <button
          type="button"
          onClick={createService}
          className="px-16 py-8 bg-orange-200"
        >
          Create service
        </button>
        <button
          type="button"
          onClick={createTrigger}
          className="px-16 py-8 bg-orange-200"
        >
          Create trigger
        </button>
        <button
          type="button"
          onClick={createReaction}
          className="px-16 py-8 bg-orange-200"
        >
          Create reaction
        </button>
        <button
          type="button"
          onClick={createTrirea}
          className="px-16 py-8 bg-orange-200"
        >
          create trirea
        </button>
      </div> */}
      <div className="grid grid-cols-4 gap-y-8 gap-x-8">
        {trireas.map((trirea) => {
          return (
            <TrireaCard
              id={trirea.id}
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
