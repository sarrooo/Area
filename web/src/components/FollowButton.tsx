import { IoMdAdd } from 'react-icons/io'
import { FiCheck } from 'react-icons/fi'

export type FollowButtonProps = {
  isFollowing?: boolean
}

export const FollowButton = ({ isFollowing }: FollowButtonProps) => {
  const text = isFollowing ? 'Following' : 'Follow'
  return (
    <div className="flex items-center space-x-2">
      <p>{text}</p>
      {isFollowing ? <FiCheck /> : <IoMdAdd />}
    </div>
  )
}
