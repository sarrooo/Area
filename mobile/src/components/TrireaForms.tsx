import {Button, Select} from 'native-base'
import React, {useEffect, useState} from 'react'
import {useForm, useFieldArray} from 'react-hook-form'
import {StyleSheet, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {useGetReactionsQuery} from '../redux/services/reaction'
import {useGetServicesQuery} from '../redux/services/service'
import {useGetTriggersQuery} from '../redux/services/trigger'
import {useCreateTrireaMutation} from '../redux/services/trirea'
import {Reaction} from '../types/Reaction'
import {Service} from '../types/Service'
import {Trigger} from '../types/Trigger'
import {TrireaFormRequest} from '../types/Trirea'
import {capitalizeFirstLetter} from '../utils/string'
import {MainInput} from './MainInput'
import {MainSelect} from './MainSelect'

type TrireaFormProps = {
  toggleModal: () => void
}

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 12,
  },
})

export function TrireaForms({toggleModal}: TrireaFormProps) {
  // Form
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
    reset,
    setValue,
  } = useForm<TrireaFormRequest>({reValidateMode: 'onSubmit'})
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
      data.triggerInputs = data.triggerInputs.map(triggerInput => {
        if (triggerInput.triggerInputTypeId === 0)
          triggerInput.triggerInputTypeId = null
        return triggerInput
      })
      data.triggerId = Number(data.triggerId)
      await createTrirea(data).unwrap()
      reset()
      toggleModal()
      //   toast.success('Trirea created !')
    } catch (error) {
      //   toast.error('Something went wrong with trirea creation')
    }
  }

  // Use effect to set available SERVICES
  useEffect(() => {
    if (services.isError) {
      // toast.error('Something went wrong with services')
    }
    if (services.isSuccess) {
      // TODO : UNCOMMENT THIS
      // const servicesFiltered = services.data?.filter((service) => {
      //     return service.subscribed
      // })
      // setServicesAvailable(servicesFiltered)
      setServicesAvailable(services.data || [])
    }
  }, [services])

  // Use effect to handle selected TRIGGER SERVICE
  useEffect(() => {
    try {
      if (!selectedTriggerService) return
      reset(formValues => ({
        ...formValues,
        triggerId: 0,
      }))
      setSelectedTrigger(undefined)
      setTriggersAvailable(selectedTriggerService.triggers || [])
    } catch (error) {
      // toast.error('Something went wrong with selected trigger service')
    }
  }, [selectedTriggerService])

  // Use effect to handle selected REACTION SERVICE
  useEffect(() => {
    try {
      if (!selectedReactionService) return
      reset(formValues => ({
        ...formValues,
        reactionId: 0,
      }))
      setSelectedReaction(undefined)
      setReactionsAvailable(selectedReactionService.reactions || [])
    } catch (error) {
      // toast.error('Something went wrong with selected reaction service')
    }
  }, [selectedReactionService])

  // Use effect to handle selected TRIGGER
  useEffect(() => {
    try {
      removeTriggerInputs()
      if (!selectedTrigger) return
      let i = 0
      selectedTrigger.inputs?.forEach(input => {
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
      // toast.error('Something went wrong with selected trigger')
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
        trigger => trigger.id === selectedTriggerId
      )
      if (!searchedSelectedTrigger) {
        throw new Error('Trigger not found')
      }
      setSelectedTrigger(searchedSelectedTrigger)
    } catch (error) {
      // toast.error('Something went wrong with triggers')
    }
  }, [watchTrigger, triggers])

  // Use effect to handle selected REACTION
  useEffect(() => {
    try {
      removeReactionInputs()
      if (!selectedReaction) return
      let i = 0
      selectedReaction.inputs?.forEach(input => {
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
      // toast.error('Something went wrong with selected reaction')
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
        reaction => reaction.id === selectedReactionId
      )
      if (!searchedSelectedReaction) {
        throw new Error('Reaction not found')
      }
      setSelectedReaction(searchedSelectedReaction)
    } catch (error) {
      // toast.error('Something went wrong with reactions')
    }
  }, [watchReaction, reactions])

  return (
    <View>
      <MainInput
        id="name"
        label="Name"
        fieldName="name"
        placeholder="My Trirea"
        control={control}
        isRequired
        rules={{required: 'Required field'}}
        errors={errors}
      />
      {/* TRIGGER Service */}
      <MainSelect
        id="triggerService"
        label="Trigger Services"
        fieldName="triggerServiceId"
        placeholder="Choose a service"
        isRequired
        rules={{required: 'Required field'}}
        errors={errors}
        customOnChange={target => {
          const searchedSelectedTriggerService = servicesAvailable.find(
            service => service.id === parseInt(target, 10)
          )
          setSelectedTriggerService(searchedSelectedTriggerService)
        }}>
        {servicesAvailable.map(
          service =>
            service.triggers && (
              <Select.Item
                key={service.id}
                label={service.name}
                value={service.id?.toString() || '0'}
              />
            )
        )}
      </MainSelect>
      {/* REACTION Service */}
      <MainSelect
        id="reactionService"
        label="Reaction Services"
        fieldName="reactionServiceId"
        placeholder="Choose a service"
        isRequired
        rules={{required: 'Required field'}}
        errors={errors}
        customOnChange={target => {
          const searchedSelectedReactionService = servicesAvailable.find(
            service => service.id === parseInt(target, 10)
          )
          setSelectedReactionService(searchedSelectedReactionService)
        }}>
        {servicesAvailable.map(
          service =>
            service.reactions && (
              <Select.Item
                key={service.id}
                label={service.name}
                value={service.id?.toString() || '0'}
              />
            )
        )}
      </MainSelect>
      {/* TRIGGERS */}
      <MainSelect<TrireaFormRequest>
        id="trigger"
        label="Trigger"
        fieldName="triggerId"
        placeholder="Choose a trigger"
        control={control}
        isRequired
        rules={{
          min: {
            value: 1,
            message: 'Required field',
          },
        }}
        errors={errors}>
        {triggersAvailable.map(trigger => (
          <Select.Item
            key={trigger.id}
            label={trigger.name}
            value={trigger.id?.toString() || '0'}
          />
        ))}
      </MainSelect>
      {/* TRIGGERS inputs */}
      {fieldsTriggerInputs.map((field, index) => (
        <MainInput<TrireaFormRequest>
          key={field.id}
          id={field.id}
          label={`Input : ${field.name}`}
          fieldName={`triggerInputs.${index}.value`}
          placeholder="Enter a value"
          control={control}
          rules={{
            required: 'Required field',
          }}
          // inputType={field.type === 'Int' ? 'number' : 'text'}
          inputType="text"
          errors={errors}
        />
      ))}
      {/* REACTIONS */}
      <MainSelect<TrireaFormRequest>
        id="reaction"
        label="Reaction"
        fieldName="reactionId"
        placeholder="Choose a reaction"
        control={control}
        isRequired
        rules={{
          min: {
            value: 1,
            message: 'Required field',
          },
        }}
        errors={errors}>
        {reactionsAvailable.map(reaction => (
          <Select.Item
            key={reaction.id}
            label={reaction.name}
            value={reaction.id?.toString() || '0'}
          />
        ))}
      </MainSelect>
      {/* REACTIONS inputs */}
      {fieldsReactionInputs.map((field, index) => {
        return watch(
          `reactionInputs.${index}.triggerOutputTypeId`
        )?.toString() !== '0' ? (
          <MainSelect<TrireaFormRequest>
            key={field.id}
            id={field.id}
            label={`Input : ${field.name}`}
            fieldName={`reactionInputs.${index}.triggerOutputTypeId`}
            placeholder="Choose an input"
            control={control}
            isRequired
            rules={{
              min: {
                value: 1,
                message: 'Required field',
              },
            }}
            errors={errors}>
            {selectedTrigger &&
              selectedTrigger.outputs?.map(output => {
                if (output.type === field.type) {
                  return (
                    <Select.Item
                      key={output.id}
                      label={output.name}
                      value={output.id?.toString() || '0'}
                    />
                  )
                }
                return null
              })}
            <Select.Item key={-1} label="custom" value="0" />
          </MainSelect>
        ) : (
          <View
            key={field.id}
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <MainInput<TrireaFormRequest>
              key={field.id}
              id={field.id}
              label={`Input : ${field.name}`}
              fieldName={`reactionInputs.${index}.value`}
              placeholder="Enter a value"
              control={control}
              rules={{
                required: 'Required field',
              }}
              // inputType={field.type === 'Int' ? 'number' : 'text'}
              inputType="text"
              errors={errors}
              style={{flex: 1}}
            />
            <View style={{height: '100%', flexDirection: 'column-reverse'}}>
              <Icon.Button
                name="cancel"
                size={30}
                backgroundColor="#B2BEB5"
                iconStyle={{marginRight: 0}}
                onPress={() => {
                  setValue(`reactionInputs.${index}.triggerOutputTypeId`, -1)
                }}
              />
            </View>
          </View>
        )
      })}
      <MainInput
        id="salut"
        label="salut"
        fieldName="reactionId"
        placeholder="Enter a value"
        control={control}
        rules={{
          required: 'Required field',
        }}
        // inputType={field.type === 'Int' ? 'number' : 'text'}
        inputType="text"
        errors={errors}
        style={{flex: 1}}
      />
      <Button
        style={styles.submitButton}
        variant="subtle"
        onPress={handleSubmit(submitTrirea)}>
        Create
      </Button>
    </View>
  )
}
