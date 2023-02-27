import { useState } from 'react'
import { IoMdMore } from 'react-icons/io'
import { BiTrash } from 'react-icons/bi'
import { toast } from 'react-toastify'
import {
  useDeleteTrireaMutation,
  useUpdateTrireaMutation,
} from '../redux/services/trirea'
import { Trirea } from '@/types/Trirea'

export type trireaProps = {
  id: number
  name: string
  triggerName: string
  reactionName: string
  trirea: Trirea
}

export const TrireaCard = ({
  id,
  name,
  triggerName,
  reactionName,
  trirea,
}: trireaProps) => {
  const [showMenu, setShowMenu] = useState(false)

  const [deleteTrireaMutation] = useDeleteTrireaMutation()
  const [updateTrireaMutation] = useUpdateTrireaMutation()

  const toggleActive = async () => {
    try {
      await updateTrireaMutation({ ...trirea, enabled: !trirea.enabled })
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const hideMenu = () => {
    if (showMenu) setShowMenu(false)
  }

  // const editTrirea = () => {}

  const deleteTrirea = async () => {
    try {
      id = Number(id)
      await deleteTrireaMutation(id).unwrap()
      toast.success('Trirea deleted')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div
      key={id.toString()}
      onClick={hideMenu}
      className="relative h-96 cursor-default space-y-8 rounded-lg bg-white p-8 text-left shadow-lg"
      aria-hidden="true"
    >
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">{name}</h1>
        <button
          type="button"
          onClick={toggleMenu}
          className="rounded-full  text-black hover:bg-gray-100"
        >
          <IoMdMore size={32} />
        </button>
      </div>
      <h1 className="text-xl font-bold">
        Trigger:<span className="font-normal"> {triggerName}</span>
      </h1>
      <h1 className="text-xl font-bold">
        Reaction:
        <span className="font-normal"> {reactionName}</span>
      </h1>
      <button
        type="button"
        onClick={toggleActive}
        className="relative inline-flex cursor-pointer items-center"
      >
        <input
          id="active"
          type="checkbox"
          checked={trirea.enabled}
          className="peer sr-only"
          onChange={toggleActive}
        />
        <div className="peer-checked:bg-primary-900 peer-focus:ring-primary-900 dark:peer-focus:ring-primary-900 peer  h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700" />
      </button>
      {showMenu && (
        <div className="absolute top-24 right-8 flex flex-col rounded-lg bg-white shadow-lg">
          {/* <button
            type="button"
            onClick={editTrirea}
            className="flex items-center space-x-4 rounded-t-lg px-6 py-4 transition ease-in-out hover:bg-gray-300"
          >
            <BiEdit size={18} />
            <span>edit</span>
          </button> */}
          <button
            type="button"
            onClick={deleteTrirea}
            className="flex items-center space-x-4 rounded-b-lg px-6 py-4 transition ease-in-out hover:bg-red-100"
          >
            <BiTrash size={18} />
            <span>delete</span>
          </button>
        </div>
      )}
    </div>
  )
}
