import { TrireaCard } from '@/components/TrireaCard'
import { CreateTrireaButton } from '@/components/CreateTrireaButton'
import { useAppSelector } from '@/redux/hooks'

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
  const isLogged = useAppSelector((state) => state.user.isLogged)

  console.log(isLogged)

  return (
    <div className="px-32 py-16 space-y-16">
      <h1 className="font-bold text-4xl">Dashboard</h1>
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
