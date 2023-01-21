import { IoMdAdd } from 'react-icons/io'

export type CreateTrireaButtonProps = {
  className?: string
  userdId: number
}

export const CreateTrireaButton = () => {
  const createTrirea = () => {
    console.log('create a trirea')
  }

  return (
    <button
      type="button"
      onClick={createTrirea}
      className="p-16 space-y-16 flex flex-col justify-center items-center border-dashed border-4 border-black rounded-lg transition ease-in-out hover:border-solid hover:bg-primary-900"
    >
      <h1 className="font-bold text-2xl">Create a trirea</h1>
      <IoMdAdd size={48}/>
    </button>
  )
}
