type InputProps = {
  className?: string
  required?: boolean
  placeholder?: string
  id: string
  label: string
  typeInput?: 'text' | 'password'
}

export const Input = ({
  className = '',
  required = true,
  placeholder = 'input',
  id,
  label,
  typeInput = 'text',
}: InputProps) => {
  return (
    <div className={`p-2 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 text-left"
      >
        {label}
        <input
          type={typeInput}
          id={id}
          required={required}
          className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
        />
      </label>
    </div>
  )
}
