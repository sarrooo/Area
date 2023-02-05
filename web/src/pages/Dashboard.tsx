import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { TrireaCard } from '@/components/TrireaCard'
import { CreateTrireaButton } from '@/components/CreateTrireaButton'
import {
  useCreateTrireaMutation,
  useGetTrireasQuery,
} from '@/redux/services/trirea'
import { useCreateServiceMutation } from '@/redux/services/service'
import {
  useCreateTriggerInputMutation,
  useCreateTriggerMutation,
} from '@/redux/services/trigger'
import { useCreateReactionMutation } from '@/redux/services/reaction'
import { selectUser } from '@/redux/features/userSlice'
import { Trirea } from '@/types/Trirea'
import { Trigger, TriggerInputType } from '@/types/Trigger'

const dummyService = {
  name: 'Service1',
  requiredSubscription: false,
}

const dummyTriggerInput: TriggerInputType = {
  name: 'input1',
  type: 'string',
  triggerId: 1,
  mandatory: true,
}

const dummyTrigger: Trigger = {
  name: 'Trigger1',
  serviceId: 1,
  inputs: [
    {
      name: 'input1',
      type: 'string',
      triggerId: 1,
      mandatory: true,
    },
    {
      name: 'input2',
      type: 'number',
      triggerId: 1,
      mandatory: false,
    },
    {
      name: 'input3',
      type: 'date',
      triggerId: 1,
      mandatory: false,
    },
  ],
  description: 'description',
}

const dummyReaction = {
  name: 'Reaction1',
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

export const Dashboard = () => {
  const myData = useSelector(selectUser)
  const { data: trireas, isLoading, isError } = useGetTrireasQuery()
  const [createServiceMutation] = useCreateServiceMutation()
  const [createTriggerMutation] = useCreateTriggerMutation()
  const [createReactionMutation] = useCreateReactionMutation()
  const [createTrireaMutation] = useCreateTrireaMutation()
  const [createTriggerInputMutation] = useCreateTriggerInputMutation()
  // const [getTrireasMutation] = useGetTrireasMutation()

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
  const createTriggerInput = () => {
    createTriggerInputMutation(dummyTriggerInput)
  }

  // const setTrireas = async () => {
  //   try {
  //     await getTrireasMutation().unwrap()
  //   } catch (error) {
  //     toast.error('Invalid email or password')
  //   }
  // }

  // useEffect(() => {
  //   if (!myData.trireas) setTrireas()
  // }, [myData])

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
        <button
          type="button"
          onClick={createTriggerInput}
          className="bg-orange-200 px-16 py-8"
        >
          create trigger input
        </button>
      </div>
      <div className="grid grid-cols-4 gap-y-8 gap-x-8">
        <CreateTrireaButton />
        {isError && toast.error('Something went wrong')}
        {isLoading && <div>Loading...</div>}{' '}
        {trireas &&
          trireas.map((trirea: Trirea) => {
            return (
              <TrireaCard
                id={trirea.id ? trirea.id : -1}
                name={trirea.name}
                triggerName={trirea.triggerId.toString()}
                reactionName={trirea.reactionId.toString()}
                isActive={trirea.enabled}
              />
            )
          })}
      </div>
    </div>
  )
}
