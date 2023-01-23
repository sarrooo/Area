import { useForm } from 'react-hook-form'
import { HiX } from 'react-icons/hi'
import { MainButton } from '@/components/MainButton'
import { PageIndicator } from '@/components/PageIndicator'
import { LoginRequest } from '@/types/Login'
import { Input } from '@/components/Input'

export const TrireaForm = () => {
  const { register } = useForm<LoginRequest>({ reValidateMode: 'onSubmit' })
  const setIsShowing = (boolfs: boolean) => {
    console.log('close modal')
  }

  return (
    <div
      onClick={() => {
        setIsShowing(false)
      }}
      id="editUserModal"
      tabIndex={-1}
      aria-hidden="true"
      className="flex justify-center backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center p-4 w-full md:inset-0 h-modal md:h-full"
    >
      <div className="w-full h-full md:h-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="relative w-1/2 bg-white rounded-lg shadow dark:bg-gray-700 cursor-default"
        >
          <div className="flex justify-between items-center p-4 rounded-t border-b">
            <h3 className="text-xl font-semibold text-gray-900">
              Create a trirea
            </h3>
            <button
              onClick={() => {
                setIsShowing(false)
              }}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="editUserModal"
            >
              <HiX size={32} />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="w-1/2 space-y-8">
              <Input
                id="name"
                label="Name"
                placeholder="trirea"
                register={register}
                fieldName="text"
              />
              <Input
                id="name"
                label="Name"
                placeholder="trirea"
                register={register}
                fieldName="text"
              />
              <Input
                id="name"
                label="Name"
                placeholder="trirea"
                register={register}
                fieldName="text"
              />
              <Input
                id="name"
                label="Name"
                placeholder="trirea"
                register={register}
                fieldName="text"
              />
              <Input
                id="name"
                label="Name"
                placeholder="trirea"
                register={register}
                fieldName="text"
              />
            </div>
            <div className="w-full flex justify-between items center">
              <PageIndicator current={1} pages={2} />
              <MainButton text="Next" />
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
