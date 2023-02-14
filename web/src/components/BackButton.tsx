import { Link } from 'react-router-dom'
import { IoMdArrowBack } from 'react-icons/io'

export const BackButton = () => {
  return (
    <Link to="/services">
      <div className="bg-primary-900 w-fit rounded-full p-4">
        <IoMdArrowBack size={24} />{' '}
      </div>
    </Link>
  )
}
