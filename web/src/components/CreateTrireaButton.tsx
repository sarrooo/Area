import { IoMdAdd } from 'react-icons/io'
import { useState } from 'react'
import { TrireaForm } from '@/components/TrireaForm'

export type CreateTrireaButtonProps = {
  className?: string
  userdId: number
}

export const CreateTrireaButton = () => {
  const [showForm, setShowForm] = useState(false)
  const toggleForm = () => {
    setShowForm(!showForm)
  }

  return (
    <button
      type="button"
      onClick={toggleForm}
      className="p-16 space-y-16 flex flex-col justify-center items-center border-dashed border-4 border-black rounded-lg transition ease-in-out hover:border-solid hover:bg-primary-900"
    >
      <h1 className="font-bold text-2xl">Create a trirea</h1>
      <IoMdAdd size={48} />
      {showForm && <TrireaForm />}
    </button>
  )
}
