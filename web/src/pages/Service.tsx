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
      <div className="w-1/2 px-32 py-16  space-y-12">
        <BackButton />
        <div className="space-y-4">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">{service.name}</h1>
            <FollowButton isFollowing={service.isFollowing} />
          </div>
          <p className="text-lg w-2/3">{service.description}</p>
        </div>
        <div className="flex space-x-2 items-center">
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
      <div className="w-1/2 px-32 py-32 h-screen bg-primary-900 flex flex-col space-y-8">
        <div className="flex space-x-2 items-center">
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
