import { LoginWithButtonPropsProps } from 'types/loginWithButton.type'

export const LoginWithButton = ({
  text,
  callback,
  className = '',
  children,
  logged,
  disabled,
}: LoginWithButtonPropsProps) => {
  const color = logged
    ? 'bg-green-200 cursor-default'
    : 'bg-white hover:bg-gray-100'
  return (
    <button
      disabled={disabled}
      type="button"
      className={`text-xl disabled:bg-gray-400 items-center flex justify-center space-x-4 font-bold py-2 px-16 transition ease-in-out rounded-xl shadow-md ${color} ${className}`}
      onClick={callback}
    >
      {children}
      <span>{text}</span>
    </button>
  )
}
