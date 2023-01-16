import { ButtonProps } from 'types/mainButton.type'

export const MainButton = ({
  text,
  callback,
  className = '',
  children,
  submitter,
}: ButtonProps) => {
  return (
    <button
      type={submitter ? 'submit' : 'button'}
      className={`items-center bg-blue-300 text-white py-4 px-8 rounded-xl hover:bg-blue-400 shadow-md ${className}`}
      onClick={callback}
    >
      <span>{text}</span>
      {children}
    </button>
  )
}
