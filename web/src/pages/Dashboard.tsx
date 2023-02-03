import { useSelector } from 'react-redux'
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
import { selectUser, UserState } from '@/redux/features/userSlice'

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
  triggerId: 1,
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
  // const { data, error, isError } = useGetTrireasQuery()
  const { data: serviceData } = useGetServicesQuery()
  // const { trirea } = useSelector((state: UserState) => state.user)
  const myData = useSelector((state: UserState) => state.user)
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

  console.log('state ', myData)
  console.log('serviceData -> ', serviceData)
  return (
    <div className="space-y-16 px-32 py-16">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="flex space-x-8">
        <button
          type="button"
          onClick={createService}
          className="bg-orange-200 px-16 py-8"
        >
          Create service
        </button>
        <button
          type="button"
          onClick={createTrigger}
          className="bg-orange-200 px-16 py-8"
        >
          Create trigger
        </button>
        <button
          type="button"
          onClick={createReaction}
          className="bg-orange-200 px-16 py-8"
        >
          Create reaction
        </button>
        <button
          type="button"
          onClick={createTrirea}
          className="bg-orange-200 px-16 py-8"
        >
          create trirea
        </button>
      </div>
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
