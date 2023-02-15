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
  children?: React.ReactNode

  register?: UseFormRegister<TFormValues>
  fieldName: Path<TFormValues>
  rules?: RegisterOptions
  errors?: Partial<FieldErrors<TFormValues>>

  onChange?: React.ReactEventHandler<HTMLSelectElement>
}

export const Select = <TFormValues extends FieldValues>({
  id,
  label,
  className = '',
  register,
  placeholder,
  fieldName,
  rules,
  errors,
  required,
  children,
  onChange,
}: InputProps<TFormValues>) => {
  return (
    <div className={`p-2 ${className}`}>
      <label
        htmlFor={id}
        className="block text-left text-sm font-medium text-gray-900 "
      >
        {label}
        <select
          defaultValue=""
          id={id}
          onChange={onChange || undefined}
          {...(register && register(fieldName, rules))}
          required={required}
          className="relative mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {children}
        </select>
      </label>
      {errors && (
        <ErrorMessage
          errors={errors}
          name={fieldName as never}
          render={({ message }) => (
            <p className="mt-1 block text-left font-serif text-sm text-red-700">
              {message}
            </p>
          )}
        />
      )}
    </div>
  )
}
