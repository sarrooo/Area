export type LoginWithButtonPropsProps = {
  text: string
  url: string
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  logged?: boolean
}

export const LoginWithButton = ({
  text,
  url,
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
      className={`flex items-center justify-center space-x-4 rounded-xl py-2 px-16 text-xl font-bold shadow-md transition ease-in-out disabled:bg-gray-400 ${color} ${className}`}
      onClick={() => window.location.assign(url)}
    >
      {children}
      <span>{text}</span>
    </button>
  )
}
