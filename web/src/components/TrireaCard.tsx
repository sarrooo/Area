import { useState } from 'react'
import { IoMdMore } from 'react-icons/io'
import { BiEdit, BiTrash } from 'react-icons/bi'

export type trireaProps = {
  id: number
  name: string
  triggerName: string
  reactionName: string
  isActive: boolean
}

export const TrireaCard = ({
  id,
  name,
  triggerName,
  reactionName,
  isActive,
}: trireaProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const [activeState, setActiveState] = useState(isActive)

  const toggleActive = () => {
    setActiveState(!activeState)
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const hideMenu = () => {
    if (showMenu) setShowMenu(false)
  }

  const editTrirea = () => {
    console.log('edit trirea')
  }

  const deleteTrirea = () => {
    console.log('delete trirea')
  }

  return (
    <button
      key={id.toString()}
      type="button"
      onClick={hideMenu}
      className="bg-white text-left h-96 rounded-lg shadow-lg p-8 space-y-8 relative cursor-default"
    >
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">{name}</h1>
        <button
          type="button"
          onClick={toggleMenu}
          className="text-black  rounded-full hover:bg-gray-100"
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
        className="relative inline-flex items-center cursor-pointer"
      >
        <input
          id="active"
          type="checkbox"
          checked={activeState}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-primary-900 dark:peer-focus:ring-primary-900 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-900" />
      </button>
      {showMenu && (
        <div className="absolute flex flex-col top-24 right-8 shadow-lg rounded-lg bg-white">
          <button
            type="button"
            onClick={editTrirea}
            className="flex space-x-4 items-center px-6 py-4 rounded-t-lg transition ease-in-out hover:bg-gray-300"
          >
            <BiEdit size={18} />
            <span>edit</span>
          </button>
          <button
            type="button"
            onClick={deleteTrirea}
            className="flex space-x-4 items-center px-6 py-4 rounded-b-lg transition ease-in-out hover:bg-red-100"
          >
            <BiTrash size={18} />
            <span>delete</span>
          </button>
        </div>
      )}
    </button>
  )
}
