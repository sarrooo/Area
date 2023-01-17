export type InputProps = {
  className?: string
  required?: boolean
  placeholder?: string
  id: string
}

export const Input = ({
  className = '',
  required = true,
  placeholder = 'input',
  id,
}: InputProps) => {
  return (
    <div className={`p-2 ${className}`}>
      <label
        htmlFor={id}
        className="block pb-2 mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
      >
        Last name
        <input
          type="text"
          id={id}
          required={required}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
        />
      </label>
    </div>
  )
}
