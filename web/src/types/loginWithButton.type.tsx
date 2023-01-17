import React from 'react'

export type LoginWithButtonPropsProps = {
  text: string
  callback: () => void
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  logged?: boolean
}
