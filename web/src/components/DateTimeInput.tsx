import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

type DateTimeInputProps<TFormValues extends FieldValues> = {
  id: string
  label: string
  className?: string
  required?: boolean

  register: UseFormRegister<TFormValues>
  fieldName: Path<TFormValues>
  rules?: RegisterOptions
  errors?: Partial<FieldErrors<TFormValues>>
}

export const DateTimeInput = <TFormValues extends FieldValues>({
  id,
  label,
  className = '',
  required,

  register,
  fieldName,
  rules,
  errors,
}: DateTimeInputProps<TFormValues>) => {
  return (
    <div className={`p-2 ${className}`}>
      <label
        className="block text-left text-sm font-medium text-gray-900 "
        htmlFor="at_time.time"
      >
        {label}
        <input
          className="relative mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          required={required}
          {...register(fieldName, rules)}
          id={id}
          type="datetime-local"
        />
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
