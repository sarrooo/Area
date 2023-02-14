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
    <div
      onClick={toggleForm}
      className="hover:bg-primary-900 flex flex-col items-center justify-center space-y-16 rounded-lg border-4 border-dashed border-black p-16 text-center transition ease-in-out hover:border-solid"
      aria-hidden="true"
    >
      <h1 className="text-2xl font-bold">Create a trirea</h1>
      <IoMdAdd size={48} />
      {showForm && <TrireaForm />}
    </div>
  )
}
