import { TrireaCard } from '@/components/TrireaCard'
import { CreateTrireaButton } from '@/components/CreateTrireaButton'
import { useGetTrireaQuery } from '@/redux/services/user'

const trireas = [
  {
    name: 'test',
    triggerName: 'get email',
    reactionName: 'send email',
    isActive: true,
  },
  {
    name: 'test',
    triggerName: 'get email',
    reactionName: 'send email',
    isActive: true,
  },
  {
    name: 'test',
    triggerName: 'get email',
    reactionName: 'send email',
    isActive: true,
  },
  {
    name: 'test',
    triggerName: 'get email',
    reactionName: 'send email',
    isActive: true,
  },
  {
    name: 'test',
    triggerName: 'get email',
    reactionName: 'send email',
    isActive: true,
  },
]

export const Dashboard = () => {
  const { data, error, isError, isLoading } = useGetTrireaQuery()

  return (
    <div className="px-32 py-16 space-y-16">
      <h1 className="font-bold text-4xl">Dashboard</h1>

      {isLoading && <p>Loading...</p>}
      {isError && <p> {JSON.stringify(error.data)} </p>}
      {!isError && !isLoading && <p> {JSON.stringify(data)} </p>}

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
