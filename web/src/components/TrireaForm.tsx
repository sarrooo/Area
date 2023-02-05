import { useForm } from 'react-hook-form'
import { HiX } from 'react-icons/hi'
import { MainButton } from '@/components/MainButton'
import { Input } from '@/components/Input'
import { Trirea, TrireaFormRequest } from '@/types/Trirea'
import { Select } from '@/components/Select'
import { useGetServiceQuery, useGetServicesQuery } from '@/redux/services/service'
import {
  useGetTriggerQuery,
  useGetTriggersQuery,
} from '@/redux/services/trigger'
import {
  useGetReactionQuery,
  useGetReactionsQuery,
} from '@/redux/services/reaction'
import { useCreateTrireaMutation } from '@/redux/services/trirea'
import { UserState } from '@/redux/features/userSlice'
import { useEffect, useState } from 'react'
import { getOauthTwitterUrl } from '@/utils/oauth/twitter'
import { LoginWithButton } from '@/components/LoginWithButton'
import { BsTwitter } from 'react-icons/bs'
import { useMeQuery } from '@/redux/services/user'
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
  const stateData = useSelector((state: UserState) => state.user)
  const dispatch = useDispatch()
  const services = useGetServicesQuery()
  const triggers = useGetTriggersQuery()
  const reactions = useGetReactionsQuery()
  const selectedTrigger = useGetTriggerQuery(watch('triggerId'))
  const selectedReaction = useGetReactionQuery(watch('reactionId'))
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
        triggerInputTypeId: 1,
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
        triggerInputTypeId: 1,
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
        reactionInputTypeId: 1,
      })
    if (data.reactionInput3)
      data.reactionInputs.push({
        value: data.reactionInput3,
        trireaId: 1,
        reactionInputTypeId: 1,
      })
    data.triggerId = parseInt(data.triggerId)
    data.reactionId = parseInt(data.reactionId)
    createTrirea(data)
  }

  return (
    <div
      onClick={() => {
        setIsShowing()
      }}
      id="editUserModal"
      tabIndex={-1}
      aria-hidden="true"
      className="h-modal fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 backdrop-blur-sm md:inset-0 md:h-full"
    >
      <div className="h-full w-full md:h-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="relative bottom-4 w-3/4 cursor-default rounded-lg bg-white shadow dark:bg-gray-700"
        >
          <div className="flex items-center justify-bet ray-900">
              Create a trirea
            </h3>
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
                  className="text-xl mr-5 disabled:bg-gray-400 items-center flex space-x-4 font-bold py-4 px-8 transition ease-in-out rounded-xl shadow-md"
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
        </button>
      </div>
    </div>
  )
}
