import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useFieldArray, useForm } from 'react-hook-form'
import { HiX } from 'react-icons/hi'
import { MainButton } from '@/components/MainButton'
import { Input } from '@/components/Input'
import { TrireaFormRequest } from '@/types/Trirea'
import { Select } from '@/components/Select'
import { useGetServicesQuery } from '@/redux/services/service'
import { useGetTriggersQuery } from '@/redux/services/trigger'
import { useGetReactionsQuery } from '@/redux/services/reaction'
import { useCreateTrireaMutation } from '@/redux/services/trirea'
import { LoginWithButton } from '@/components/LoginWithButton'
import { capitalizeFirstLetter } from '../utils/string'
import { Trigger } from '../types/Trigger'
import { Reaction } from '../types/Reaction'
import { MappingOauth, mappingOauth } from '../utils/oauth'
import { Service } from '../types/Service'

type TrireaFormProps = {
  toggleModal: () => void
}

export const TrireaForm = ({ toggleModal }: TrireaFormProps) => {
  // Form
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
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

  // Queries
  const services = useGetServicesQuery()
  const triggers = useGetTriggersQuery()
  const reactions = useGetReactionsQuery()
  const [createTrirea] = useCreateTrireaMutation()

  // States
  const [oauthNeeded, setOauthNeeded] = useState<MappingOauth[]>([])

  const [selectedTriggerService, setSelectedTriggerService] =
    useState<Service>()
  const [selectedReactionService, setSelectedReactionService] =
    useState<Service>()

  const [selectedTrigger, setSelectedTrigger] = useState<Trigger>()
  const [selectedReaction, setSelectedReaction] = useState<Reaction>()

  const [triggersAvailable, setTriggersAvailable] = useState<Trigger[]>([])
  const [reactionsAvailable, setReactionsAvailable] = useState<Reaction[]>([])

  const handleServiceSubscription = (service: Service) => {
    const filtredOauthNeeded = oauthNeeded.filter((oauth) => {
      return !(
        oauth.name !== selectedTriggerService?.name &&
        oauth.name !== selectedReactionService?.name
      )
    })

    if (service.requiredSubscription && !service.subscribed) {
      const oauthMappingSelected = mappingOauth.find(
        (oauth) => oauth.name === service.name
      )
      if (!oauthMappingSelected) throw new Error('Oauth not found')
      if (oauthNeeded.includes(oauthMappingSelected)) return
      filtredOauthNeeded.push(oauthMappingSelected)
    }
    setOauthNeeded(filtredOauthNeeded)
  }

  const submitTrirea = async (data: TrireaFormRequest) => {
    try {
      data.enabled = true
      data.reactionId = Number(data.reactionId)
      data.triggerId = Number(data.triggerId)
      await createTrirea(data).unwrap()
      reset()
      toast.success('Trirea created !')
    } catch (error) {
      toast.error('Something went wrong with trirea creation')
    }
  }

  // Use effect to handle selected TRIGGER SERVICE
  useEffect(() => {
    try {
      if (!selectedTriggerService) return
      reset((formValues) => ({
        ...formValues,
        triggerId: 0,
      }))
      setSelectedTrigger(undefined)
      setTriggersAvailable(selectedTriggerService.triggers || [])
      handleServiceSubscription(selectedTriggerService)
    } catch (error) {
      toast.error('Something went wrong with selected trigger service')
    }
  }, [selectedTriggerService])

  // Use effect to handle selected REACTION SERVICE
  useEffect(() => {
    try {
      if (!selectedReactionService) return
      reset((formValues) => ({
        ...formValues,
        reactionId: 0,
      }))
      setSelectedReaction(undefined)
      setReactionsAvailable(selectedReactionService.reactions || [])
      handleServiceSubscription(selectedReactionService)
    } catch (error) {
      toast.error('Something went wrong with selected reaction service')
    }
  }, [selectedReactionService])

  // Use effect to handle selected TRIGGER
  useEffect(() => {
    try {
      removeTriggerInputs()
      if (!selectedTrigger) return
      let i = 0
      selectedTrigger.inputs?.forEach((input) => {
        const splittedName = input.name.split('.')
        insertTriggerInputs(i, {
          triggerInputTypeId: input.id,
          name: capitalizeFirstLetter(splittedName[1]),
          type: input.type,
          value: '',
        })
        i += 1
      })
    } catch (error) {
      toast.error('Something went wrong with selected trigger')
    }
  }, [selectedTrigger])

  // Use effect to set selected TRIGGER
  useEffect(() => {
    try {
      if (triggers.isError) {
        throw new Error('Getting triggers failed')
      }
      const selectedTriggerId = Number(watchTrigger)
      if (!selectedTriggerId || !triggers.isSuccess) return
      const searchedSelectedTrigger = triggers.data?.find(
        (trigger) => trigger.id === selectedTriggerId
      )
      if (!searchedSelectedTrigger) {
        throw new Error('Trigger not found')
      }
      setSelectedTrigger(searchedSelectedTrigger)
    } catch (error) {
      toast.error('Something went wrong with triggers')
    }
  }, [watchTrigger, triggers])

  // Use effect to handle selected REACTION
  useEffect(() => {
    try {
      removeReactionInputs()
      if (!selectedReaction) return
      let i = 0
      selectedReaction.inputs?.forEach((input) => {
        const splittedName = input.name.split('.')
        insertReactionInputs(i, {
          reactionInputTypeId: input.id,
          name: capitalizeFirstLetter(splittedName[1]),
          type: input.type,
          value: '',
        })
        i += 1
      })
    } catch (error) {
      toast.error('Something went wrong with selected reaction')
    }
  }, [selectedReaction])

  // Use effect to set selected REACTION
  useEffect(() => {
    try {
      if (reactions.isError) {
        throw new Error('Getting reactions failed')
      } else if (
        !watchReaction ||
        watchReaction === 0 ||
        !reactions.isSuccess
      ) {
        return
      }
      const selectedReactionId = Number(watchReaction)
      if (!selectedReactionId) return
      const searchedSelectedReaction = reactions.data?.find(
        (reaction) => reaction.id === selectedReactionId
      )
      if (!searchedSelectedReaction) {
        throw new Error('Reaction not found')
      }
      setSelectedReaction(searchedSelectedReaction)
    } catch (error) {
      toast.error('Something went wrong with reactions')
    }
  }, [watchReaction, reactions])

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
                {/* TRIGGER Service */}
                <Select
                  id="triggerService"
                  label="Trigger Services"
                  fieldName="triggerServiceId"
                  placeholder="Choose a service"
                  onChange={(e) => {
                    const target = e.target as HTMLSelectElement
                    const searchedSelectedTriggerService = services.data?.find(
                      (service) => service.id === parseInt(target.value, 10)
                    )
                    setSelectedTriggerService(searchedSelectedTriggerService)
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
                {/* REACTION Service */}
                <Select
                  id="reactionService"
                  label="Reaction Services"
                  fieldName="reactionServiceId"
                  placeholder="Choose a service"
                  onChange={(e) => {
                    const target = e.target as HTMLSelectElement
                    const searchedSelectedReactionService = services.data?.find(
                      (service) => service.id === parseInt(target.value, 10)
                    )
                    setSelectedReactionService(searchedSelectedReactionService)
                  }}
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
                {/* TRIGGERS */}
                <Select<TrireaFormRequest>
                  id="trigger"
                  label="Trigger"
                  fieldName="triggerId"
                  placeholder="Choose a trigger"
                  register={register}
                  rules={{
                    min: {
                      value: 1,
                      message: 'Required field',
                    },
                  }}
                  errors={errors}
                >
                  {triggersAvailable?.map((trigger) => (
                    <option key={trigger.id} value={trigger.id}>
                      {trigger.name}
                    </option>
                  ))}
                </Select>
                {/* TRIGGERS inputs */}
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
                    inputType={field.type === 'Int' ? 'number' : 'text'}
                    errors={errors}
                  />
                ))}
              </div>
              <div className="w-1/3 space-y-4">
                <p>Reaction</p>
                {/* REACTIONS */}
                <Select<TrireaFormRequest>
                  id="reaction"
                  label="Reaction"
                  fieldName="reactionId"
                  placeholder="Choose a reaction"
                  register={register}
                  rules={{
                    min: {
                      value: 1,
                      message: 'Required field',
                    },
                  }}
                  errors={errors}
                >
                  {reactionsAvailable?.map((reaction) => (
                    <option key={reaction.id} value={reaction.id}>
                      {reaction.name}
                    </option>
                  ))}
                  {/* REACTIONS inputs */}
                </Select>
                {fieldsReactionInputs.map((field, index) => (
                  <Input<TrireaFormRequest>
                    key={field.id}
                    id={field.id}
                    label={`Input : ${field.name}`}
                    fieldName={`reactionInputs.${index}.value`}
                    placeholder="Enter a value"
                    register={register}
                    rules={{
                      min: {
                        value: 1,
                        message: 'Required field',
                      },
                    }}
                    inputType={field.type === 'number' ? 'number' : 'text'}
                    errors={errors}
                  />
                ))}
              </div>
            </div>
            <div className="items center flex w-full justify-end">
              {oauthNeeded?.map((oauth) => {
                return (
                  <LoginWithButton
                    text="Connect"
                    key={oauth.name}
                    url={oauth.url}
                    className="mr-5 flex items-center space-x-4 rounded-xl py-4 px-8 text-xl font-bold shadow-md transition ease-in-out disabled:bg-gray-400"
                  >
                    {oauth.icon}
                  </LoginWithButton>
                )
              })}
              <MainButton submitter disabled={!oauthNeeded} text="Create" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
