import { useNavigate } from 'react-router-dom'
import { IoMdSend } from 'react-icons/io'
import { AiFillEye } from 'react-icons/ai'
import { BackButton } from '@/components/BackButton'
import { FollowButton } from '@/components/FollowButton'
import { ActionDescriptionCard } from '@/components/ActionDescriptionCard'
import { MainButton } from '@/components/MainButton'

const service = {
  name: 'Google',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio justo, eleifend vestibulum iaculis eget.',
  isFollowing: true,
  triggers: [
    {
      name: 'get an email',
      description: 'When you get an email',
      options: ['from', 'time', 'attachement'],
      outputs: ['time', 'attachement'],
    },
  ],
  reactions: [
    {
      name: 'get an email',
      description: 'When you get an email',
      options: ['from', 'time', 'attachement'],
    },
  ],
}

export const Service = () => {
  const navigate = useNavigate()

  const test = () => {
    navigate('/dashboard')
  }

  return (
    <div className="flex justify-between">
      <MainButton
        primary={false}
        text="Create trirea"
        callback={test}
        className="fixed bottom-8 right-8"
      />
      <div className="w-1/2 space-y-12 px-32  py-16">
        <BackButton />
        <div className="space-y-4">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">{service.name}</h1>
            <FollowButton isFollowing={service.isFollowing} />
          </div>
          <p className="w-2/3 text-lg">{service.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <AiFillEye size={32} className="text-red-300" />
          <h1 className="text-xl font-bold">Triggers</h1>
        </div>
        {service.triggers.map((trigger) => {
          return (
            <ActionDescriptionCard
              name={trigger.name}
              description={trigger.description}
              options={trigger.options}
              outputs={trigger.outputs}
            />
          )
        })}
      </div>
      <div className="bg-primary-900 flex h-screen w-1/2 flex-col space-y-8 p-32">
        <div className="flex items-center space-x-2">
          <IoMdSend size={32} className="text-white" />
          <h1 className="text-xl font-bold">Reactions</h1>
        </div>
        {service.reactions.map((reaction) => {
          return (
            <ActionDescriptionCard
              name={reaction.name}
              description={reaction.description}
              options={reaction.options}
            />
          )
        })}{' '}
      </div>
    </div>
  )
}
