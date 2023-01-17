import { ButtonProps } from 'types/mainButton.type'

export const MainButton = ({
  text,
  callback,
  className = '',
  children,
  primary = true,
  submitter,
  disabled,
}: ButtonProps) => {
  const buttonColor = primary
    ? 'bg-blue-300 hover:bg-blue-400'
    : 'bg-white hover:bg-gray-100'

  return (
    <button
      disabled={disabled}
      type={submitter ? 'submit' : 'button'}
      className={`${className} ${buttonColor} text-xl disabled:bg-gray-400 items-center flex space-x-4 font-bold py-4 px-8 transition ease-in-out rounded-xl shadow-md`}
      onClick={callback}
    >
      <span>{text}</span>
      {children}
    </button>
  )
}
