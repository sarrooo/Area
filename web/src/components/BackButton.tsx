import { Link } from 'react-router-dom'
import { IoMdArrowBack } from 'react-icons/io'

export const BackButton = () => {
  return (
    <Link to="/services">
      <div className="w-fit p-4 bg-primary-900 rounded-full">
        <IoMdArrowBack size={24} />{' '}
      </div>
    </Link>
  )
}
