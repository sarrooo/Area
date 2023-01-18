import { IoMdSend } from 'react-icons/io'
import { AiFillEye } from 'react-icons/ai'

export type ServiceCardDescriptionProps = {
  isReaction: boolean
  name: string
}

export const ServiceCardDescription = ({
  isReaction,
  name,
}: ServiceCardDescriptionProps) => {
  return (
    <div className="flex items-center space-x-2">
      {isReaction ? (
        <IoMdSend className="text-primary-900" />
      ) : (
        <AiFillEye className="text-red-300" />
      )}
      <p>{name}</p>
    </div>
  )
}
