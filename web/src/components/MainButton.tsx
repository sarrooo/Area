export type MainButtonProps = {
  text: string
  callback?: () => void
  className?: string
  children?: React.ReactNode
  submitter?: boolean
  disabled?: boolean
  primary?: boolean
}

export const MainButton = ({
  text,
  callback,
  className = '',
  children,
  primary = true,
  submitter,
  disabled,
}: MainButtonProps) => {
  const buttonColor = primary
    ? 'bg-primary-700 hover:bg-primary-900'
    : 'bg-white hover:bg-gray-100'

  return (
    <button
      disabled={disabled}
      type={submitter ? 'submit' : 'button'}
      className={`text-xl disabled:bg-gray-400 items-center flex space-x-4 font-bold py-4 px-8 transition ease-in-out rounded-xl shadow-md ${className} ${buttonColor}`}
      onClick={callback}
    >
      <span>{text}</span>
      {children}
    </button>
  )
}
