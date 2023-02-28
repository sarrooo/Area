import React from 'react'
import {FormControl, Input} from 'native-base'
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
  Controller,
  Control,
} from 'react-hook-form'

type InputProps<TFormValues extends FieldValues> = {
  id: string
  className?: string
  placeholder?: string
  isRequired?: boolean
  label: string
  inputType?: 'text' | 'password'

  fieldName: Path<TFormValues>
  rules?: RegisterOptions
  control: Control<TFormValues>
  errors?: Partial<FieldErrors<TFormValues>>
}

import {StyleSheet} from 'react-native'

export const MainInput = <TFormValues extends FieldValues>({
  id,
  placeholder = 'input',
  inputType = 'text',
  fieldName,
  control,
  isRequired = false,
  label,
  rules,
  errors,
}: InputProps<TFormValues>) => {
  return (
    <FormControl key={id} isRequired={isRequired} isInvalid={errors ? fieldName in errors : false}>
      <FormControl.Label>{label}</FormControl.Label>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            type={inputType}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder={placeholder}
          />
        )}
        name={fieldName}
        rules={rules}
      />
      <FormControl.ErrorMessage>
        {errors?.[fieldName]?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
  },
})
