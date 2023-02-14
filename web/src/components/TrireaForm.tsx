import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { HiX } from 'react-icons/hi'
import { BsTwitter } from 'react-icons/bs'
import { MainButton } from '@/components/MainButton'
import { Input } from '@/components/Input'
import { TrireaFormRequest } from '@/types/Trirea'
import { Select } from '@/components/Select'
import { useGetServicesQuery } from '@/redux/services/service'
import { useGetTriggersQuery } from '@/redux/services/trigger'
import { useGetReactionsQuery } from '@/redux/services/reaction'
import { useCreateTrireaMutation } from '@/redux/services/trirea'
import { getOauthTwitterUrl } from '@/utils/oauth/twitter'
import { LoginWithButton } from '@/components/LoginWithButton'
import { DateTimeInput } from '@/components/DateTimeInput'

export const TrireaForm = () => {
  const { register, handleSubmit, watch } = useForm<TrireaFormRequest>({
    defaultValues: {
      name: '',
      triggerId: 1,
      reactionId: 1,
      triggerInputs: [],
      reactionInputs: [],
      enabled: true,
    },
    reValidateMode: 'onSubmit',
  })
  const watchTrigger = watch('triggerId')
  const watchReaction = watch('reactionId')
  const services = useGetServicesQuery()
  const triggers = useGetTriggersQuery()
  const reactions = useGetReactionsQuery()
  const [createTrirea] = useCreateTrireaMutation()

  const [needTriggerOauth, setTriggerNeedOauth] = useState(false)
  const [needReactionOauth, setReactionNeedOauth] = useState(false)

  useEffect(() => {
    if (!watchTrigger) {
      return
    }
    const triggerChoosen = Number(watchTrigger)
    triggers.data?.forEach((trigger) => {
      if (trigger.id === triggerChoosen) {
        services.data?.forEach((service) => {
          if (service.id === trigger.serviceId) {
            if (service.requiredSubscription && !service.subscribed) {
              setTriggerNeedOauth(true)
            } else {
              setTriggerNeedOauth(false)
            }
          }
        })
      }
    })
  }, [watchTrigger])

  useEffect(() => {
    if (!watchReaction) {
      return
    }
    const reactionChoosen = Number(watchReaction)
    reactions.data?.forEach((reaction) => {
      if (reaction.id === reactionChoosen) {
        services.data?.forEach((service) => {
          if (service.id === reaction.serviceId) {
            if (service.requiredSubscription && !service.subscribed) {
              setReactionNeedOauth(true)
            } else {
              setReactionNeedOauth(false)
            }
          }
        })
      }
    })
  }, [watchReaction])

  const setIsShowing = () => {
    console.log('close modal')
  }

  const submitTrirea = (data: TrireaFormRequest) => {
    if (data.triggerInput1)
      data.triggerInputs.push({
        value: data.triggerInput1,
        trireaId: 1,
        triggerInputTypeId: 3,
      })
    if (data.triggerInput2)
      data.triggerInputs.push({
        value: data.triggerInput2,
        trireaId: 1,
        triggerInputTypeId: 1,
      })
    if (data.triggerInput3)
      data.triggerInputs.push({
        value: data.triggerInput3,
        trireaId: 1,
        triggerInputTypeId: 2,
      })
    if (data.reactionInput1)
      data.reactionInputs.push({
        value: data.reactionInput1,
        trireaId: 1,
        reactionInputTypeId: 1,
      })
    if (data.reactionInput2)
      data.reactionInputs.push({
        value: data.reactionInput2,
        trireaId: 1,
        reactionInputTypeId: 2,
      })
    if (data.reactionInput3)
      data.reactionInputs.push({
        value: data.reactionInput3,
        trireaId: 1,
        reactionInputTypeId: 3,
      })
    data.triggerId = Number(data.triggerId)
    data.reactionId = Number(data.reactionId)
    createTrirea(data).then(() => {
      toast.info('Trirea created !')
    })
  }

  return (
    <div
      onClick={() => {
        setIsShowing()
      }}
      id="editUserModal"
      tabIndex={-1}
      aria-hidden="true"
      className="h-modal fixed inset-x-0 top-0 z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 backdrop-blur-sm md:inset-0 md:h-full"
    >
      <div className="flex h-full w-full justify-center align-middle md:h-auto">
        <div className="relative bottom-4 w-3/4 cursor-default rounded-lg bg-white shadow dark:bg-gray-700">
          <div className="justify-bet ray-900 flex items-center">
            <h3 className="px-4 text-xl font-bold">Create a trirea</h3>
            <button
              onClick={() => {
                setIsShowing()
              }}
              type="button"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              data-modal-toggle="editUserModal"
            >
              <HiX size={32} />
            </button>
          </div>
          <form onSubmit={handleSubmit(submitTrirea)} className="space-y-6 p-6">
            <div className="flex space-x-16">
              <div className="w-1/3 space-y-4">
                <p>General</p>
                <Input<TrireaFormRequest>
                  id="name"
                  label="Name"
                  placeholder="trirea"
                  register={register}
                  fieldName="name"
                />
                <Select<TrireaFormRequest>
                  id="trigger"
                  label="Trigger"
                  placeholder="Choose a trigger"
                  register={register}
                  fieldName="triggerId"
                >
                  {triggers.data?.map((trigger) => (
                    <option key={trigger.id} value={trigger.id}>
                      {trigger.name}
                    </option>
                  ))}
                </Select>
                <Select<TrireaFormRequest>
                  id="reaction"
                  label="Reaction"
                  placeholder="Choose a reaction"
                  register={register}
                  fieldName="reactionId"
                >
                  {reactions.data?.map((reaction) => (
                    <option key={reaction.id} value={reaction.id}>
                      {reaction.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="w-1/3 space-y-4">
                <p>Trigger Inputs</p>
                <Input<TrireaFormRequest>
                  id="every.freq"
                  label="Frequency (minutes)"
                  inputType="number"
                  placeholder="30"
                  register={register}
                  fieldName="triggerInput1"
                />
                <DateTimeInput
                  id="at_time.time"
                  label="At time"
                  register={register}
                  fieldName="triggerInput2"
                />
                <Input<TrireaFormRequest>
                  id="new_tweet_from.username"
                  label="Username"
                  inputType="text"
                  placeholder="mikatech"
                  register={register}
                  fieldName="triggerInput3"
                />
              </div>
              <div className="w-1/3 space-y-4">
                <p>Reaction Inputs</p>
                <Input<TrireaFormRequest>
                  id="send_message.message"
                  label="Message to send"
                  inputType="text"
                  placeholder="hello"
                  register={register}
                  fieldName="reactionInput1"
                />
                <Input<TrireaFormRequest>
                  id="send_message.username"
                  label="Username"
                  inputType="text"
                  placeholder="dave"
                  register={register}
                  fieldName="reactionInput2"
                />
                <Input<TrireaFormRequest>
                  id="like_tweet.tweet"
                  label="Tweeet ID"
                  inputType="number"
                  placeholder="000000"
                  register={register}
                  fieldName="reactionInput3"
                />
              </div>
            </div>
            <div className="items center flex w-full justify-end">
              {(needTriggerOauth || needReactionOauth) && (
                <LoginWithButton
                  text="Need to connect"
                  url={getOauthTwitterUrl()}
                  className="mr-5 flex items-center space-x-4 rounded-xl py-4 px-8 text-xl font-bold shadow-md transition ease-in-out disabled:bg-gray-400"
                >
                  <BsTwitter />
                </LoginWithButton>
              )}
              <MainButton
                submitter
                disabled={needTriggerOauth || needReactionOauth}
                text="Create"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
