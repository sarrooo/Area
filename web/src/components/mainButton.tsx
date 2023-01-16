import { ButtonProps } from '~/types/mainButton.type'

export const mainButton = ({
  text,
  callback,
  className = '',
  children,
  submitter,
}: ButtonProps) => {
  return (
    <button
      type={submitter ? 'submit' : 'button'}
      className={`items-center bg-primary text-white py-4 px-8 rounded-xl hover:bg-primary800 shadow-md ${className}`}
      onClick={callback}
    >
      <span>{text}</span>
      {children}
    </button>
  )
}
