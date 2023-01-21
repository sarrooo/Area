import { IoMdMore } from 'react-icons/io'

export type trireaProps = {
  name: string
  triggerName: string
  reactionName: string
  isActive: boolean
}

export const TrireaCard = ({
  name,
  triggerName,
  reactionName,
  isActive,
}: trireaProps) => {
  const toggleActive = () => {
    isActive = !isActive
    console.log(isActive)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Name</h1>
        <IoMdMore size={32} />
      </div>
      <h1 className="text-xl font-bold">
        Trigger:<span className="font-normal"> {triggerName}</span>
      </h1>
      <h1 className="text-xl font-bold">
        Reaction:
        <span className="font-normal"> {reactionName}</span>
      </h1>
      <label
        htmlFor="active"
        className="relative inline-flex items-center cursor-pointer"
      >
        <input id="active" type="checkbox" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-primary-900 dark:peer-focus:ring-primary-900 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-900" />
      </label>
    </div>
  )
}
