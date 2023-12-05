'use client'

import React from 'react'
import type { IconType } from 'react-icons'

type ButtonProps = {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full rounded-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 ${
        outline ? 'bg-white' : 'bg-rose-500'
      } ${outline ? 'border-black' : 'border-rose-500'} ${
        outline ? 'text-black' : 'text-white'
      } ${small ? 'py-1' : 'py-3'} ${small ? 'text-sm' : 'text-md'} ${
        small ? 'font-light' : 'font-semibold'
      } ${small ? 'border-[1px]' : 'border-2'}`}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  )
}

export default Button
