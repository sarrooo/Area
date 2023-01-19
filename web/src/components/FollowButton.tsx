import { IoMdAdd } from 'react-icons/io'
import { FiCheck } from 'react-icons/fi'

export type FollowButtonProps = {
  isFollowing?: boolean
}

export const FollowButton = ({ isFollowing }: FollowButtonProps) => {
  const text = isFollowing ? 'Following' : 'Follow'
  return (
    <div className="flex space-x-2 items-center">
      <p>{text}</p>
      {isFollowing ? <FiCheck /> : <IoMdAdd />}
    </div>
  )
}
