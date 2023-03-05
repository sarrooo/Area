import React from 'react'
import {FormControl, Input} from 'native-base'
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  Controller,
  Control,
} from 'react-hook-form'

import {StyleProp, ViewStyle} from 'react-native'

type InputProps<TFormValues extends FieldValues> = {
  id: string
  placeholder?: string
  isRequired?: boolean
  label: string
  inputType?: 'text' | 'password'

  fieldName: Path<TFormValues>
  rules?: RegisterOptions
  control: Control<TFormValues>
  errors?: Partial<FieldErrors<TFormValues>>

  style?: StyleProp<ViewStyle>
}

export function MainInput<TFormValues extends FieldValues>({
  id,
  placeholder = 'input',
  inputType = 'text',
  fieldName,
  control,
  isRequired = false,
  label,
  rules,
  errors,
  style,
}: InputProps<TFormValues>) {
  return (
    <FormControl
      style={style}
      key={id}
      isRequired={isRequired}
      isInvalid={errors ? fieldName in errors : false}>
      <FormControl.Label>{label}</FormControl.Label>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            type={inputType}
            onBlur={onBlur}
            onChangeText={changedValue => onChange(changedValue)}
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
