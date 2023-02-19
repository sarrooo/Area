import { useNavigate, useParams } from 'react-router-dom'
import { IoMdSend } from 'react-icons/io'
import { AiFillEye } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { BackButton } from '@/components/BackButton'
import { FollowButton } from '@/components/FollowButton'
import { ActionDescriptionCard } from '@/components/ActionDescriptionCard'
import { MainButton } from '@/components/MainButton'
import { useGetServiceQuery } from '../redux/services/service'
import { MappingOauth, mappingOauth } from '../utils/oauth'
import { LoginWithButton } from '../components/LoginWithButton'

const Service = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: service, isLoading } = useGetServiceQuery(
    parseInt(id || '0', 10)
  )
  const [oauthNeeded, setOauthNeeded] = useState<MappingOauth>()

  useEffect(() => {
    if (!service || service.subscribed) return
    const oauthMappingSelected = mappingOauth.find(
      (oauth) => oauth.name === service.name
    )
    if (oauthMappingSelected) {
      setOauthNeeded(oauthMappingSelected)
    }
  }, [service])

  if (!id) navigate('/services')

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="flex justify-between">
      <MainButton
        primary={false}
        text="Create trirea"
        callback={() => navigate('/dashboard')}
        className="fixed bottom-8 right-8"
      />
      {!service ? (
        <h1>Error occured</h1>
      ) : (
        <>
          <div className="w-1/2 space-y-12 px-32  py-16">
            <BackButton />
            <div className="space-y-4">
              <div className="flex justify-between">
                <h1 className="text-4xl font-bold">{service.name}</h1>
                {oauthNeeded ? (
                  <LoginWithButton
                    text="Connect"
                    key={oauthNeeded.name}
                    url={oauthNeeded.url}
                    className="mr-5 flex items-center space-x-4 rounded-xl py-4 px-8 text-xl font-bold shadow-md transition ease-in-out disabled:bg-gray-400"
                  >
                    {oauthNeeded.icon}
                  </LoginWithButton>
                ) : (
                  <FollowButton isFollowing={service.subscribed} />
                )}
              </div>
              <p className="w-2/3 text-lg">{service.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <AiFillEye size={32} className="text-red-300" />
              <h1 className="text-xl font-bold">Triggers</h1>
            </div>
            {service.triggers
              ? service.triggers.map((trigger) => {
                  return (
                    <ActionDescriptionCard
                      key={trigger.id}
                      name={trigger.name}
                      description={trigger.description || 'No description'}
                      inputs={trigger.inputs?.map((input) => input.name)}
                      outputs={trigger.outputs?.map((output) => output.name)}
                    />
                  )
                })
              : []}
          </div>
          <div className="bg-primary-900 flex h-screen w-1/2 flex-col space-y-8 p-32">
            <div className="flex items-center space-x-2">
              <IoMdSend size={32} className="text-white" />
              <h1 className="text-xl font-bold">Reactions</h1>
            </div>
            {service.reactions
              ? service.reactions.map((reaction) => {
                  return (
                    <ActionDescriptionCard
                      key={reaction.id}
                      name={reaction.name}
                      description={reaction.description || 'No description'}
                      inputs={reaction.inputs?.map((input) => input.name)}
                    />
                  )
                })
              : []}{' '}
          </div>
        </>
      )}
    </div>
  )
}

export default Service
