import { useForm, useFieldArray } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { HiX } from 'react-icons/hi'
import { MainButton } from '@/components/MainButton'
import { Input } from '@/components/Input'
import { Trirea, TrireaFormRequest } from '@/types/Trirea'
import { Select } from '@/components/Select'
import { useGetServicesQuery } from '@/redux/services/service'
import {
  useGetTriggerInputsQuery,
  useGetTriggerQuery,
  useGetTriggersQuery,
} from '@/redux/services/trigger'
import { useGetReactionsQuery } from '@/redux/services/reaction'
import { useCreateTrireaMutation } from '@/redux/services/trirea'
import { UserState } from '@/redux/features/userSlice'
import { useEffect } from 'react'

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

  const stateData = useSelector((state: UserState) => state.user)
  const dispatch = useDispatch()
  const services = useGetServicesQuery()
  const triggers = useGetTriggersQuery()
  const reactions = useGetReactionsQuery()
  const [createTrirea] = useCreateTrireaMutation()
  const triggerInputs = useGetTriggerQuery(1)
  const allTriggerInputs = useGetTriggerInputsQuery()

  const setIsShowing = () => {
    console.log('close modal')
  }

  const submitTrirea = (data: Trirea) => {
    createTrirea(data)
  }

  console.log(watch())
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
          <div className="flex items-center justify-between rounded-t border-b p-4">
            <h3 className="text-xl font-semibold text-gray-900">
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
                {triggers.data &&
                  triggers.data[watch('triggerId') - 1] &&
                  triggers.data[watch('triggerId') - 1].inputs !== undefined &&
                  triggers.data[watch('triggerId') - 1].inputs.map(
                    (input, index = 0) => (
                      <Input<TrireaFormRequest>
                        id={input.name}
                        label={input.name}
                        inputType={input.type === 'string' ? 'text' : 'number'}
                        placeholder={input.name}
                        register={register}
                        fieldName="triggerInputs"
                      />
                    )
                  )}
              </div>
              <div className="w-1/3 space-y-4">
                <p>Reaction Inputs</p>
                {reactions.data &&
                  reactions.data[watch('reactionId') - 1] &&
                  reactions.data[watch('reactionId') - 1].inputs !==
                    undefined &&
                  reactions.data[watch('reactionId') - 1].inputs.map(
                    (input) => (
                      <Input<TrireaFormRequest>
                        id={input.name}
                        label={input.name}
                        inputType={input.type === 'string' ? 'text' : 'number'}
                        placeholder={input.name}
                        register={register}
                        fieldName="triggerInputs"
                      />
                    )
                  )}
              </div>
            </div>
            <div className="items center flex w-full justify-end">
              <MainButton submitter text="Create" />
            </div>
          </form>
        </button>
      </div>
    </div>
  )
}
