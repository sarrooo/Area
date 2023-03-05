import React from 'react'
import {FormControl, Select} from 'native-base'
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  Controller,
  Control,
} from 'react-hook-form'

type InputProps<TFormValues extends FieldValues> = {
  id: string
  placeholder?: string
  isRequired?: boolean
  label: string
  children?: React.ReactNode

  fieldName: Path<TFormValues>
  rules?: RegisterOptions
  control?: Control<TFormValues>
  errors?: Partial<FieldErrors<TFormValues>>

  customOnChange?: (itemValue: string) => void
}

export function MainSelect<TFormValues extends FieldValues>({
  id,
  placeholder = 'input',
  fieldName,
  control,
  isRequired = false,
  label,
  rules,
  errors,
  children,
  customOnChange,
}: InputProps<TFormValues>) {
  return (
    <FormControl
      key={id}
      isRequired={isRequired}
      isInvalid={errors ? fieldName in errors : false}>
      <FormControl.Label>{label}</FormControl.Label>
      {(control && (
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <Select
              onValueChange={onChangedValue =>
                customOnChange
                  ? customOnChange(onChangedValue)
                  : onChange(onChangedValue)
              }
              placeholder={placeholder}>
              {children}
            </Select>
          )}
          name={fieldName}
          rules={rules}
        />
      )) || (
        <Select
          onValueChange={value =>
            customOnChange ? customOnChange(value) : () => {}
          }
          placeholder={placeholder}>
          {children}
        </Select>
      )}
      <FormControl.ErrorMessage>
        {errors?.[fieldName]?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
