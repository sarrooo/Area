import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

type InputProps<TFormValues extends FieldValues> = {
  id: string
  label: string
  className?: string
  placeholder?: string
  required?: boolean
  inputType?: 'text' | 'password'

  register: UseFormRegister<TFormValues>
  fieldName: Path<TFormValues>
  rules?: RegisterOptions
  errors?: Partial<FieldErrors<TFormValues>>
}

export const Input = <TFormValues extends FieldValues>({
  id,
  label,
  className = '',
  placeholder = 'input',
  inputType = 'text',
  register,
  fieldName,
  rules,
  errors,
}: InputProps<TFormValues>) => {
  return (
    <div className={`p-2 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 text-left "
      >
        {label}
        <input
          {...register(fieldName, rules)}
          type={inputType}
          id={id}
          className="relative mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
        />
      </label>
      {errors && (
        <ErrorMessage
          errors={errors}
          name={fieldName as never}
          render={({ message }) => (
            <p className="font-serif text-sm text-left block text-red-700 mt-1">
              {message}
            </p>
          )}
        />
      )}
    </div>
  )
}
