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
      className="flex flex-col items-center justify-center space-y-16 rounded-lg border-4 border-dashed border-black p-16 transition ease-in-out hover:border-solid hover:bg-primary-900"
    >
      <h1 className="text-2xl font-bold">Create a trirea</h1>
      <IoMdAdd size={48} />
      {showForm && <TrireaForm />}
    </button>
  )
}
