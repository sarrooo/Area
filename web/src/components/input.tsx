import { InputType } from '@/types/input.type'

export const Input = ({
  className = '',
  type,
  placeholder = 'input',
}: InputType) => {
  return (
    <input
      className={`text-gray400 ${className}`}
      type={type}
      placeholder={placeholder}
    />
  )
}
