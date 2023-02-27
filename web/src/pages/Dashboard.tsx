import { toast } from 'react-toastify'
import { TrireaCard } from '@/components/TrireaCard'
import { CreateTrireaButton } from '@/components/CreateTrireaButton'
import { useGetTrireasQuery } from '@/redux/services/trirea'
import { Trirea } from '@/types/Trirea'

export const Dashboard = () => {
  const { data: trireas, isLoading, isError } = useGetTrireasQuery()

  return (
    <div className="space-y-16 px-32 py-16">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-4 gap-8">
        <CreateTrireaButton />
        {isError && toast.error('Something went wrong')}
        {isLoading && <div>Loading...</div>}{' '}
        {trireas &&
          trireas.map((trirea: Trirea) => {
            return (
              <TrireaCard
                key={trirea.id}
                id={trirea.id ? trirea.id : -1}
                name={trirea.name}
                triggerName={trirea.triggerId.toString()}
                reactionName={trirea.reactionId.toString()}
                trirea={trirea}
              />
            )
          })}
      </div>
    </div>
  )
}
