import React from 'react'
import {Input as NativeInput} from 'native-base'
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

type InputProps<TFormValues extends FieldValues> = {
  id: string
  className?: string
  placeholder?: string
  required?: boolean
  inputType?: 'text' | 'password'

  register: UseFormRegister<TFormValues>
  fieldName: Path<TFormValues>
  rules?: RegisterOptions
  errors?: Partial<FieldErrors<TFormValues>>
}

import {View, Text, StyleSheet} from 'react-native'

export const Input = <TFormValues extends FieldValues>({
  id,
  placeholder = 'input',
  register,
  fieldName,
  inputType = 'text',
  rules,
  errors,
}: InputProps<TFormValues>) => {

  console.log("Information given to input: ", id, placeholder, fieldName, inputType)

  return (
    <View style={styles.container}>
      <NativeInput
        {...register(fieldName, rules)}
        type={inputType}
        placeholder={placeholder}
        key={id}
      />
      {errors && (
        <Text style={{color: 'red'}}>{errors[fieldName]?.message}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
  },
})
