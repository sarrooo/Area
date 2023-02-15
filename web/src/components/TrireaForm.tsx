import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useFieldArray, useForm } from 'react-hook-form'
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
import { capitalizeFirstLetter } from '../utils/string'
import { Trigger } from '../types/Trigger'
import { Reaction } from '../types/Reaction'
import { Service } from '../types/Service'

type TrireaFormProps = {
  toggleModal: () => void
}

export const TrireaForm = ({ toggleModal }: TrireaFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TrireaFormRequest>({ reValidateMode: 'onSubmit' })
  const {
    fields: fieldsTriggerInputs,
    remove: removeTriggerInputs,
    insert: insertTriggerInputs,
  } = useFieldArray({
    control,
    name: 'triggerInputs',
  })
  const {
    fields: fieldsReactionInputs,
    remove: removeReactionInputs,
    insert: insertReactionInputs,
  } = useFieldArray({
    control,
    name: 'reactionInputs',
  })
  const watchTrigger = watch('triggerId')
  const watchReaction = watch('reactionId')
  const services = useGetServicesQuery()
  const triggers = useGetTriggersQuery()
  const reactions = useGetReactionsQuery()
  const [createTrirea] = useCreateTrireaMutation()

  const [selectedTriggerService, setSelectedTriggerService] = useState<Service>()
  const [selectedReactionService, setSelectedReactionService] = useState<Service>()
  
  const [selectedTrigger, setSelectedTrigger] = useState<Trigger>()
  const [selectedReaction, setSelectedReaction] = useState<Reaction>()

  const [needTriggerOauth, setTriggerNeedOauth] = useState(false)
  const [needReactionOauth, setReactionNeedOauth] = useState(false)

  // TODO: Refactor this
  // Use effect to subscribe to trigger service
  useEffect(() => {
    try {
      if (!selectedTrigger) return
      const selectedService = services.data?.find(
        (service) => service.id === selectedTrigger.serviceId
      )
      if (!selectedService) {
        throw new Error('Service not found')
      }

      if (selectedService.requiredSubscription && !selectedService.subscribed) {
        setTriggerNeedOauth(true)
      } else {
        setTriggerNeedOauth(false)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [selectedTrigger, services.isSuccess])

  // TODO: Refactor this
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

  // Use effect to handle selected TRIGGER
  useEffect(() => {
    try {
      if (!selectedTrigger) return
      removeTriggerInputs()
      let i = 0
      selectedTrigger.inputs?.forEach((input) => {
        const splittedName = input.name.split('.')
        insertTriggerInputs(i, {
          id: input.id,
          name: capitalizeFirstLetter(splittedName[1]),
          type: input.type,
          value: '',
        })
        i += 1
      })
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [selectedTrigger])

  // Use effect to set selected TRIGGER
  useEffect(() => {
    try {
      if (triggers.isError) {
        throw new Error('Getting triggers failed')
      } else if (!watchTrigger || !triggers.isSuccess) {
        return
      }
      const selectedTriggerId = Number(watchTrigger)
      const searchedSelectedTrigger = triggers.data?.find(
        (trigger) => trigger.id === selectedTriggerId
      )
      if (!searchedSelectedTrigger) {
        throw new Error('Trigger not found')
      }
      setSelectedTrigger(searchedSelectedTrigger)
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [watchTrigger, triggers])

  // Use effect to handle selected REACTION
  useEffect(() => {
    try {
      if (!selectedReaction) return
      removeReactionInputs()
      let i = 0
      selectedReaction.inputs?.forEach((input) => {
        const splittedName = input.name.split('.')
        insertReactionInputs(i, {
          id: input.id,
          name: capitalizeFirstLetter(splittedName[1]),
          type: input.type,
          value: '',
        })
        i += 1
      })
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [selectedReaction])

  // Use effect to set selected REACTION
  useEffect(() => {
    try {
      if (reactions.isError) {
        throw new Error('Getting reactions failed')
      } else if (!watchReaction || !reactions.isSuccess) {
        return
      }
      const selectedReactionId = Number(watchReaction)
      const searchedSelectedReaction = reactions.data?.find(
        (reaction) => reaction.id === selectedReactionId
      )
      if (!searchedSelectedReaction) {
        throw new Error('Reaction not found')
      }
      setSelectedReaction(searchedSelectedReaction)
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [watchReaction, reactions])

  const submitTrirea = (data: TrireaFormRequest) => {
    createTrirea(data).then(() => {
      toast.info('Trirea created !')
    })
  }

  return (
    <div
      onClick={toggleModal}
      id="editUserModal"
      tabIndex={-1}
      aria-hidden="true"
      className="h-modal fixed inset-x-0 top-0 z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 backdrop-blur-sm md:inset-0 md:h-full"
    >
      <div className="flex h-full w-full justify-center align-middle md:h-auto">
        <div
          aria-hidden="true"
          onClick={(e) => e.stopPropagation()}
          className="relative bottom-4 w-3/4 cursor-default rounded-lg bg-white shadow dark:bg-gray-700"
        >
          <div className="justify-bet ray-900 flex items-center">
            <h3 className="px-4 text-xl font-bold">Create a trirea</h3>
            <button
              onClick={toggleModal}
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
                  fieldName="name"
                  placeholder="My Trirea"
                  register={register}
                  rules={{ required: 'Required field' }}
                  errors={errors}
                />
                <Select
                  id="triggerService"
                  label="Trigger Services"
                  fieldName="triggerServiceId"
                  placeholder="Choose a service"
                  onSelect={(e) => {
                    console.log("e.target.value :>> ", e.target.value)
                  }}
                >
                  {services.data?.map(
                    (service) =>
                      service.triggers && (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      )
                  )}
                </Select>
                <Select
                  id="reactionService"
                  label="Reaction Services"
                  fieldName="reactionServiceId"
                  placeholder="Choose a service"
                >
                  {services.data?.map(
                    (service) =>
                      service.reactions && (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      )
                  )}
                </Select>
              </div>
              <div className="w-1/3 space-y-4">
                <p>Trigger</p>
                <Select<TrireaFormRequest>
                  id="trigger"
                  label="Trigger"
                  fieldName="triggerId"
                  placeholder="Choose a trigger"
                  register={register}
                  rules={{
                    required: 'Required field',
                  }}
                  errors={errors}
                >
                  {triggers.data?.map((trigger) => (
                    <option key={trigger.id} value={trigger.id}>
                      {trigger.name}
                    </option>
                  ))}
                </Select>
                {fieldsTriggerInputs.map((field, index) => (
                  <Input<TrireaFormRequest>
                    key={field.id}
                    id={field.id}
                    label={`Input : ${field.name}`}
                    fieldName={`triggerInputs.${index}.value`}
                    placeholder="Enter a value"
                    register={register}
                    rules={{
                      required: 'Required field',
                    }}
                    errors={errors}
                  />
                ))}
              </div>
              <div className="w-1/3 space-y-4">
                <p>Reaction</p>
                <Select<TrireaFormRequest>
                  id="reaction"
                  label="Reaction"
                  fieldName="reactionId"
                  placeholder="Choose a reaction"
                  register={register}
                  rules={{
                    required: 'Required field',
                  }}
                  errors={errors}
                >
                  {reactions.data?.map((reaction) => (
                    <option key={reaction.id} value={reaction.id}>
                      {reaction.name}
                    </option>
                  ))}
                </Select>
                {fieldsReactionInputs.map((field, index) => (
                  <Input<TrireaFormRequest>
                    key={field.id}
                    id={field.id}
                    label={`Input : ${field.name}`}
                    fieldName={`triggerInputs.${index}.value`}
                    placeholder="Enter a value"
                    register={register}
                    rules={{
                      required: 'Required field',
                    }}
                    errors={errors}
                  />
                ))}
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
