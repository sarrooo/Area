import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { FollowButton } from '@/components/FollowButton'
import { ServiceCardDescription } from '@/components/ServiceCardDescription'
import { Reaction } from '../types/Reaction'
import { Trigger } from '../types/Trigger'
import { useSubscribeMutation } from '@/redux/services/service'
import { MappingOauth, mappingOauth } from '../utils/oauth'
import { LoginWithButton } from './LoginWithButton'

export type ServiceCardProps = {
  name: string
  id: number
  isFollowing: boolean
  triggers: Trigger[]
  reactions: Reaction[]
}

export const ServiceCard = ({
  name,
  id,
  isFollowing,
  triggers,
  reactions,
}: ServiceCardProps) => {
  const [subscribe] = useSubscribeMutation()
  const navigate = useNavigate()

  const [oauthNeeded, setOauthNeeded] = useState<MappingOauth>()

  useEffect(() => {
    const oauthMappingSelected = mappingOauth.find(
      (oauth) => oauth.name === name
    )
    if (oauthMappingSelected) {
      setOauthNeeded(oauthMappingSelected)
    }
  })

  return (
    <div
      className="w-1/2 space-y-4 rounded-lg bg-white px-8 pb-8 pt-4 shadow-lg"
      onClick={() => navigate(`/service/${id}`)}
      aria-hidden="true"
    >
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">{name}</h1>
        {oauthNeeded ? (
          <div className="w-1/2">
            <LoginWithButton
              text="Connect"
              key={oauthNeeded.name}
              url={oauthNeeded.url}
              className="px-2"
            >
              {oauthNeeded.icon}
            </LoginWithButton>
          </div>
        ) : (
          <FollowButton
            isFollowing={isFollowing}
            onClick={() => {
              try {
                subscribe({
                  serviceId: Number(id) || 0,
                  subscribed: !isFollowing,
                })
              } catch (error) {
                toast.error('Something went wrong')
              }
            }}
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 ">
        {triggers.map((trigger) => {
          return (
            <ServiceCardDescription
              key={trigger.id}
              isReaction={false}
              name={trigger.name}
            />
          )
        })}
        {reactions.map((reaction) => {
          return (
            <ServiceCardDescription
              key={reaction.id}
              name={reaction.name}
              isReaction
            />
          )
        })}
      </div>
    </div>
  )
}
