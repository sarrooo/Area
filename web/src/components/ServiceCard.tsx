import { FollowButton } from '@/components/FollowButton'
import { ServiceCardDescription } from '@/components/ServiceCardDescription'

export type triggerProps = {
  name: string
  description: string
  options: string[]
  outputs?: string[]
}

type reaction = {
  name: string
  description: string
  options: string[]
}

export type ServiceCardProps = {
  name: string
  isFollowing: boolean
  triggers: triggerProps[]
  reactions: reaction[]
}

export const ServiceCard = ({
  name,
  isFollowing,
  triggers,
  reactions,
}: ServiceCardProps) => {
  return (
    <div className="w-1/2 space-y-4 rounded-lg bg-white px-8 pb-8 pt-4 shadow-lg">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">{name}</h1>
        <FollowButton isFollowing={isFollowing} />
      </div>
      <div className="grid grid-cols-2 gap-2 ">
        {triggers.map((trigger) => {
          return (
            <ServiceCardDescription isReaction={false} name={trigger.name} />
          )
        })}
        {reactions.map((trigger) => {
          return <ServiceCardDescription isReaction name={trigger.name} />
        })}
      </div>
    </div>
  )
}
