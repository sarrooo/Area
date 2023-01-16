import React from 'react'

export type ButtonProps = {
  text: string
  callback: () => void
  className?: string
  children?: React.ReactNode
  submitter?: boolean
}
