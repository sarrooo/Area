import { FollowButton } from '@/components/FollowButton'
import { ServiceCardDescription } from '@/components/ServiceCardDescription'

type trigger = {
  name: string
  description: string
  arguments: string[]
  outputs: string[]
}

type reaction = {
  name: string
  description: string
  arguments: string[]
}

export type ServiceCardProps = {
  name: string
  isFollowing: boolean
  triggers: trigger[]
  reactions: reaction[]
}

export const ServiceCard = ({
  name,
  isFollowing,
  triggers,
  reactions,
}: ServiceCardProps) => {
  return (
    <div className="w-1/2 px-8 pb-8 pt-4 shadow-lg rounded-lg bg-white space-y-4">
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
