import { AiFillEye } from 'react-icons/ai'
import { IoSend } from 'react-icons/io'
import { FollowButton } from '@/components/FollowButton'

export const ServiceCard = () => {
  return (
    <div className="w-1/2 px-8 py-4 shadow-lg rounded-lg bg-white">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Google</h1>
        <FollowButton isFollowing={false} />
      </div>
      <p>Non</p>
    </div>
  )
}
