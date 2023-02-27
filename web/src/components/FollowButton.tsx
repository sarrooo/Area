import { IoMdAdd } from 'react-icons/io'
import { FiCheck } from 'react-icons/fi'

export type FollowButtonProps = {
  isFollowing?: boolean
  onClick: () => void
}

export const FollowButton = ({ isFollowing, onClick }: FollowButtonProps) => {
  const text = isFollowing ? 'Following' : 'Follow'
  return (
    <button
      type="button"
      className="flex items-center space-x-2"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      aria-hidden="true"
    >
      <p>{text}</p>
      {isFollowing ? <FiCheck /> : <IoMdAdd />}
    </button>
  )
}
