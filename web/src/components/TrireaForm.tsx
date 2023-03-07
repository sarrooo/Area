import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useFieldArray, useForm } from 'react-hook-form'
import { HiX } from 'react-icons/hi'
import { GrClear } from 'react-icons/gr'
import { Input } from '@/components/Input'
import { TrireaFormRequest } from '@/types/Trirea'
import { Select } from '@/components/Select'
import { useGetServicesQuery } from '@/redux/services/service'
import { useGetTriggersQuery } from '@/redux/services/trigger'
import { useGetReactionsQuery } from '@/redux/services/reaction'
import { useCreateTrireaMutation } from '@/redux/services/trirea'
import { capitalizeFirstLetter } from '../utils/string'
import { Trigger } from '../types/Trigger'
import { Reaction } from '../types/Reaction'
import { Service } from '../types/Service'
import { MainButton } from './MainButton'

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
    setValue,
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
  const [selectedTriggerService, setSelectedTriggerService] =
    useState<Service>()
  const [selectedReactionService, setSelectedReactionService] =
    useState<Service>()

  const [selectedTrigger, setSelectedTrigger] = useState<Trigger>()
  const [selectedReaction, setSelectedReaction] = useState<Reaction>()

  const [servicesAvailable, setServicesAvailable] = useState<Service[]>([])
  const [triggersAvailable, setTriggersAvailable] = useState<Trigger[]>([])
  const [reactionsAvailable, setReactionsAvailable] = useState<Reaction[]>([])

  const submitTrirea = async (data: TrireaFormRequest) => {
    try {
      data.enabled = true
      data.reactionId = Number(data.reactionId)
      data.triggerInputs = data.triggerInputs.map((triggerInput) => {
        if (triggerInput.triggerInputTypeId === 0)
          triggerInput.triggerInputTypeId = null
        return triggerInput
      })
      data.triggerId = Number(data.triggerId)
      await createTrirea(data).unwrap()
      reset()
      toggleModal()
      toast.success('Trirea created !')
    } catch (error) {
      toast.error('Something went wrong with trirea creation')
    }
  }

  // Use effect to set available SERVICES
  useEffect(() => {
    if (services.isError) {
      toast.error('Something went wrong with services')
    }
    if (services.isSuccess) {
      const servicesFiltered = services.data?.filter((service) => {
        return service.subscribed
      })
      setServicesAvailable(servicesFiltered)
    }
  }, [services])

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
          triggerOutputTypeId: -1,
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
                    const searchedSelectedTriggerService =
                      servicesAvailable.find(
                        (service) => service.id === parseInt(target.value, 10)
                      )
                    setSelectedTriggerService(searchedSelectedTriggerService)
                  }}
                >
                  {servicesAvailable.map(
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
                    const searchedSelectedReactionService =
                      servicesAvailable.find(
                        (service) => service.id === parseInt(target.value, 10)
                      )
                    setSelectedReactionService(searchedSelectedReactionService)
                  }}
                >
                  {servicesAvailable.map(
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
                {fieldsReactionInputs.map((field, index) => {
                  return watch(
                    `reactionInputs.${index}.triggerOutputTypeId`
                  )?.toString() !== '0' ? (
                    <Select<TrireaFormRequest>
                      key={field.id}
                      id={field.id}
                      label={`Input : ${field.name}`}
                      fieldName={`reactionInputs.${index}.triggerOutputTypeId`}
                      placeholder="Choose an input"
                      register={register}
                      errors={errors}
                      rules={{
                        required: 'Required field',
                        valueAsNumber: true,
                      }}
                    >
                      {selectedTrigger &&
                        selectedTrigger.outputs?.map((output) => {
                          if (output.type === field.type) {
                            return (
                              <option key={output.name} value={output.id}>
                                {output.name}
                              </option>
                            )
                          }
                          return null
                        })}
                      <option key="-1" value="0">
                        custom
                      </option>
                    </Select>
                  ) : (
                    <div
                      key={field.id}
                      className="flex flex-row justify-between"
                    >
                      <Input<TrireaFormRequest>
                        key={field.id}
                        id={field.id}
                        label={`Input : ${field.name}`}
                        fieldName={`reactionInputs.${index}.value`}
                        placeholder="Enter a value"
                        register={register}
                        rules={{
                          required: 'Required field',
                        }}
                        inputType={field.type === 'number' ? 'number' : 'text'}
                        errors={errors}
                        className="w-full"
                      />
                      <button
                        type="button"
                        className="flex flex-col-reverse pb-3"
                        onClick={() => {
                          setValue(
                            `reactionInputs.${index}.triggerOutputTypeId`,
                            -1
                          )
                        }}
                      >
                        <GrClear size={35} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="items center flex w-full justify-end">
              <MainButton submitter text="Create" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
