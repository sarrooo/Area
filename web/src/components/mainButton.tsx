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
      className={`${className} text-xl items-center flex space-x-4 font-bold bg-blue-300 py-4 px-8 transition ease-in-out rounded-xl hover:bg-blue-400 shadow-md`}
      onClick={callback}
    >
      <span>{text}</span>
      {children}
    </button>
  )
}
